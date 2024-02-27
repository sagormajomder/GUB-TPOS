import { Request, Response } from 'express';
import { User, Notice, Group, GroupRequest, Notification, Supervisor, Board, Committee, NoticeFor, Contact } from '../models';
import Roles from '../enums/Roles';
import { BadRequestError } from '../errors/bad-request-error';
import { NotFoundError } from '../errors/not-found-error';
import Joi from 'joi';
import { RequestValidationError } from '../errors/request-validation-error';


export const getLatestSemesterInfo = async (req: Request, res: Response) => {
  const latestCommittee = await Committee.findOne()
    .sort({ semesterYear: -1, semester: -1 })
    .exec();

  if (!latestCommittee) {
    throw new NotFoundError('No committees found')
  }
  res.json({
    semester: latestCommittee.semester,
    semesterYear: latestCommittee.semesterYear,
  });
};

// Get list of supervisors
export const getSupervisors = async (req: Request, res: Response) => {
  const { semester, semesterYear } = req.query;
  const supervisor = await Supervisor.findOne({
    semester: semester,
    semesterYear: semesterYear,
  }).populate('members', 'name email imgUrl researchInterests'); // Assuming members is the field in Supervisor that holds references to User

  if (!supervisor) {
    return res.json([]);
  }

  // Calculate the count of groups per supervisor
  const supervisorWithGroupCount = await Promise.all(
    supervisor.members.map(async (member: any) => {
      // const groupCount = await Group.countDocuments({ supervisor: member._id });
      const groups = await Group.find({ supervisor: member._id }).populate('students');
      const totalStudents = groups.reduce((total, group) => total + group.students.length, 0);
      return { ...member.toObject(), groups: totalStudents, id: member._id };
    })
  );

  res.json(supervisorWithGroupCount);
};

// Get list of supervisors
export const getAllSupervisorSemesters = async (req: Request, res: Response) => {
  const supervisors = await Supervisor.find();
  res.json(supervisors);
};

// Get list of facalties
export const getFacalties = async (req: Request, res: Response) => {
  const facalties = await User.find({ role: Roles.Supervisor });
  res.json(facalties);
};

export const getSupervisorById = async (req: Request, res: Response) => {
  const supervisorId = req.params.id;
  const supervisor = await User.findById(supervisorId);
  if (!supervisor) {
    throw new NotFoundError('Supervisor not found')
  }
  res.json(supervisor);
};

// Create a new supervisor
export const createSupervisor = async (req: Request, res: Response) => {
  const { semester, semesterYear, members } = req.body;

  // Validate if required parameters are provided
  if (!semester || !semesterYear || !members || members.length === 0) {
    throw new BadRequestError('Semester, semesterYear, members are required');
  }

  // Check if a supervisor with the given semester and semesterYear already exists
  let supervisor = await Supervisor.findOne({ semester, semesterYear });

  if (supervisor) {
    // If supervisor exists, update the members
    supervisor.members = members;
    await supervisor.save();
  } else {
    // If supervisor does not exist, create a new record
    supervisor = await Supervisor.create({
      members,
      semester,
      semesterYear,
    });
  }

  res.status(201).json(supervisor);
};

// Update a supervisor by ID
export const updateSupervisor = async (req: Request, res: Response) => {
  const supervisorId = req.params.id;
  const { members, ...updateData } = req.body;

  // Get the existing supervisor
  const existingSupervisor = await Supervisor.findById(supervisorId);

  if (!existingSupervisor) {
    return res.status(404).json({ error: 'Supervisor not found' });
  }

  // Check if any member is not in the updated list
  const membersToRemove = existingSupervisor.members.filter(
    (memberId) => !members.includes(memberId.toString())
  );

  // Check if any member is associated with a group
  const groupsAssociatedWithMembers = await Group.find({
    supervisor: supervisorId,
    students: { $in: membersToRemove },
  });

  if (groupsAssociatedWithMembers.length > 0) {
    throw new BadRequestError('Cannot remove members associated with a group');
  }

  // Update the supervisor
  const updatedSupervisor = await Supervisor.findByIdAndUpdate(
    supervisorId,
    { ...updateData, members },
    { new: true } // Return the modified document instead of the original
  );

  res.json(updatedSupervisor);
};

// Get list of board members
export const getBoardMembers = async (req: Request, res: Response) => {
  const { semester, semesterYear } = req.query;
  const boardMembers = await Board.find({ semester, semesterYear }).populate('members groups', 'name email imgUrl');
  res.json(boardMembers);
};

// Get list of board members
export const getBoardSemesters = async (req: Request, res: Response) => {
  const boardMembers = await Board.find();
  res.json(boardMembers);
};

// Get list of board members
export const getBoardMember = async (req: Request, res: Response) => {
  const boardId = req.params.id;
  const boardMember = await Board.findById(boardId).populate('members groups', 'name email imgUrl');
  res.json(boardMember);
};

// Create a new board member
export const createBoardMember = async (req: Request, res: Response) => {
  const { id, title, semester, semesterYear, members } = req.body;
  // Validate if required parameters are provided
  if (!title || !semester || !semesterYear || !members || members.length === 0) {
    throw new BadRequestError('Title, semester, semesterYear, members, and groupIds are required');
  }

  if (id) {
    const board = await Board.findById(id);
    if (board) {
      board.members = members;
      await board.save();
      return res.status(200).json(board);
    }
    return res.status(404).json({ error: "Not found" });
  } else {
    // Create a new board with the provided details
    const board = await Board.create({
      title,
      members,
      semester,
      semesterYear,
      groups: [],
    });
    return res.status(201).json(board);
  }
};

// Create a notice
export const createNotice = async (req: Request, res: Response) => {
  // Validator for the request payload
  const noticeValidator = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    noticeFor: Joi.string().valid(...Object.values(NoticeFor)).required(),
    files: Joi.optional()
  });

  const { title, content, noticeFor, files } = req.body;

  const { error } = noticeValidator.validate(req.body);

  if (error) {
    const errors = error.details.map(err => {
      return {
        msg: err.message,
        type: err.context?.label!
      }
    });
    throw new RequestValidationError(errors);
  }

  // Create the notice
  const notice = await Notice.create({
    title,
    content,
    noticeFor,
    attachments: files
  });

  // TODO send notification to all

  res.status(201).json({ message: 'Notice created successfully', notice });
};

// Get notices based on the target audience
export const getNotices = async (req: Request, res: Response) => {
  const { noticeFor } = req.params;

  // Query notices based on the target audience
  const notices = await Notice.find({ noticeFor: { $in: [noticeFor, NoticeFor.ALL] } });

  res.json(notices);
};

// Get list of groups
export const getGroups = async (req: Request, res: Response) => {
  const { semester, semesterYear } = req.query;
  const groups = await Group.find({ semester: semester, semesterYear: semesterYear }).populate('supervisor students');
  res.json(groups);
};

// Get list of groups
export const getGroupSemesters = async (req: Request, res: Response) => {
  const groups = await Group.find();
  res.json(groups);
};

// Get list of group requests
export const getGroupRequests = async (req: Request, res: Response) => {
  const { semester, semesterYear } = req.query;
  const groupRequests = await GroupRequest.find({ semester: semester, semesterYear: semesterYear, status: "pending" }).populate('supervisor students');
  res.json(groupRequests);
};


// Get list of group requests
export const getPendingGroups = async (req: Request, res: Response) => {
  const { semester, semesterYear } = req.query;

  // Find rejected group requests for the specified semester and year
  const rejectedGroupRequests = await GroupRequest.find({
    semester: semester as string,
    semesterYear: semesterYear as string,
    status: "rejected"
  }).populate('students initiator');

  // Create a dictionary to track group requests based on group members and their rejection count
  const groupRequestsDict: Record<string, { count: number, request: any }> = {};

  // Update the dictionary with rejected group requests
  rejectedGroupRequests.forEach(request => {
    const groupMembers = request.students.map((student: any) => student._id.toString()).sort().join(",");

    // Increment the rejection count for the group members
    if (groupRequestsDict[groupMembers]) {
      groupRequestsDict[groupMembers].count++;
    } else {
      groupRequestsDict[groupMembers] = { count: 1, request: request };
    }
  });

  // Filter group requests with rejection count of 3
  const filteredRequests = Object.values(groupRequestsDict)
    .filter(({ count }) => count === 3)
    .map(({ request }) => request);

  res.json(filteredRequests);
};

// Assign a supervisor to a group
export const assignSupervisorToGroup = async (req: Request, res: Response) => {
  const { groupId, supervisorId } = req.body;
  const group = await Group.findById(groupId);

  if (!group)
    throw new NotFoundError('Group not found')

  const supervisor = await User.findById(supervisorId);

  if (!supervisor)
    throw new NotFoundError('Supervisor not found')

  group.supervisor = supervisorId;
  await group.save();
  res.json(group);
};

// Assign a supervisor to a group
export const assignSupervisorToPendingGroup = async (req: Request, res: Response) => {
  const { groupRequestId, supervisorId } = req.body;

  const groupRequest = await GroupRequest.findById(groupRequestId).populate("students");

  if (!groupRequest) {
    throw new NotFoundError("Group request not found")
  }

  if (groupRequest.status !== "rejected") {
    throw new BadRequestError('Invalid request status');
  }
  const groupStudents = groupRequest.students;

  // Initialize studentMarks for supervisorMarks and boardMarks with all group students and marks set to 0
  const studentMarks = groupStudents.map(student => ({
    student: student._id,
    preDefence: 0,
    defence: 0,
    criteria: []
  }));

  const supervisor = await User.findById(supervisorId);

  if (!supervisor)
    throw new NotFoundError("Supervisor not found");

  const group = new Group({
    name: groupRequest.name, // You can set the group name here
    supervisor: supervisorId,
    students: groupRequest.students,
    tasks: [], // Initialize with an empty task list
    chat: null, // Initialize with no chat
    semester: groupRequest.semester,
    semesterYear: groupRequest.semesterYear,
    boardMarks: {
      isReleased: false,
      studentMarks: studentMarks
    },
    supervisorMarks: {
      isReleased: false,
      studentMarks: studentMarks
    },
    boardComments: []
  });

  await group.save();

  // Delete all pending group requests
  await GroupRequest.deleteMany({ students: { $in: groupStudents } });

  for (const student of groupStudents) {
    const notification = new Notification({
      from: supervisorId,
      title: "Supervisor assigned",
      description: `Supervisor ${supervisor.name} assigned`,
      group: group._id,
      to: student._id
    })

    await notification.save();
  }

  res.json({ message: "Group request accepted", group });
};

// Assign a supervisor to a group
export const assignBoardToGroup = async (req: Request, res: Response) => {
  const { groupId, boardId } = req.body;
  const group = await Group.findById(groupId);

  if (!group)
    throw new NotFoundError('Group not found')

  const board = await Board.findById(boardId);

  if (!board)
    throw new NotFoundError('Board not found')

  group.board = board._id;
  await group.save();

  board.groups.push(group._id);
  await board.save();
  res.json(group);
};

// Approve group requests
export const approveGroupRequests = async (req: Request, res: Response) => {
  const { requestId, isApproved } = req.body;
  const groupRequest = await GroupRequest.findById(requestId);

  if (groupRequest) {
    if (isApproved) {
      const group = await Group.findById(groupRequest.group);
      if (group) {
        group.students = groupRequest.students;
        group.supervisor = groupRequest.supervisor;
        await group.save();
      }
    }

    groupRequest.status = isApproved ? 'accepted' : 'rejected';
    await groupRequest.save();
    res.json(groupRequest);
  } else {
    res.status(404).send('Group Request not found');
  }
};

// Delete group requests
export const deleteGroupRequest = async (req: Request, res: Response) => {
  const requestId = req.params.requestId;
  const groupRequest = await GroupRequest.findByIdAndDelete(requestId);

  if (!groupRequest) {
    throw new NotFoundError('Group Request not found')
  }
  res.json(groupRequest);
};

// Contact board
export const contactBoard = async (req: Request, res: Response) => {
  const { semester, semesterYear } = req.query;
  const { userId, title, description } = req.body;

  const reqFiles: Express.Multer.File[] = req.files as Express.Multer.File[];

  const files = reqFiles.map(f => f.filename);

  // Create a new contact object
  const contact: Contact = {
    user: userId, // Assuming userId is the ID of the user sending the contact
    title,
    description,
    attachments: files
  };

  // Find the committee with board contacts
  let committee = await Committee.findOne({ semester, semesterYear });
  if (!committee) {
    // Create a new committee if it doesn't exist
    throw new NotFoundError("Committee not found")
  }

  // Add the contact to board contacts
  committee.boardContacts.push(contact);
  await committee.save();

  res.status(201).json({ message: 'Contacted board successfully', contact });
};

// Contact supervisor
export const contactSupervisor = async (req: Request, res: Response) => {
  const { semester, semesterYear } = req.query;
  const { userId, title, description } = req.body;

  const reqFiles: Express.Multer.File[] = req.files as Express.Multer.File[];

  const files = reqFiles.map(f => f.filename);

  // Create a new contact object
  const contact: Contact = {
    user: userId, // Assuming userId is the ID of the user sending the contact
    title,
    description,
    attachments: files
  };

  // Find the committee with supervisor contacts
  let committee = await Committee.findOne({ semester, semesterYear });
  if (!committee) {
    // Create a new committee if it doesn't exist
    throw new NotFoundError("Committee not found")
  }

  // Add the contact to supervisor contacts
  committee.supervisorContacts.push(contact);
  await committee.save();

  res.status(201).json({ message: 'Contacted supervisor successfully', contact });
};

// Get board contacts by user ID
export const getBoardContactsByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  // Find the committee with board contacts
  const committee = await Committee.findOne({ 'boardContacts.user': userId });

  if (!committee) {
    return res.json([]);
  }

  // Filter the board contacts for the specified user
  const boardContacts = committee.boardContacts.filter(contact => contact.user.toString() === userId);

  res.json(boardContacts);
};

// Get supervisor contacts by user ID
export const getSupervisorContactsByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  // Find the committee with supervisor contacts
  const committee = await Committee.findOne({ 'supervisorContacts.user': userId });

  if (!committee) {
    return res.json([]);
  }

  // Filter the supervisor contacts for the specified user
  const supervisorContacts = committee.supervisorContacts.filter(contact => contact.user.toString() === userId);

  res.json(supervisorContacts);
};
