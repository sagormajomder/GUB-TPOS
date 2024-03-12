import { Request, Response } from "express";
import { Group, GroupRequest, Task, Chat, ChatModel, User, UploadedFile, Supervisor } from "../models";
import Roles from "../enums/Roles";
import { Notification } from "../models/notification";
import { BadRequestError } from "../errors/bad-request-error";
import Joi from "joi";
import { NotFoundError } from "../errors/not-found-error";
import { RequestValidationError } from "../errors/request-validation-error";

// Create a new group
export const createGroup = async (req: Request, res: Response) => {
  const { name, supervisor, students } = req.body;

  const group = new Group({
    name,
    supervisor,
    students,
    tasks: [], // Initialize with an empty task list
    chat: null, // Initialize with no chat
  });

  // add a new notification that grop request approved

  await group.save();

  res.json({ message: "Group created successfully", group });
};

// Get list of supervisors
export const getSupervisors = async (req: Request, res: Response) => {
  const supervisors = await Supervisor.find().populate('members', 'name email'); // Assuming members is the field in Supervisor that holds references to User
  // Calculate the count of groups per supervisor
  const supervisorsWithGroupCount = await Promise.all(
    supervisors.map(async (supervisor) => {
      const groupCount = await Group.countDocuments({ supervisor: supervisor._id });
      return {
        supervisor: supervisor,
        groupCount: groupCount,
      };
    })
  );
  res.json(supervisorsWithGroupCount);
};

// Get all groups
export const getGroups = async (req: Request, res: Response) => {
  const { semester, semesterYear } = req.query;
  const groups = await Group.find({ supervisor: req.currentUser?.id, semester, semesterYear })
    .populate("students supervisor board")
  res.json(groups);
};

// Get a specific group by ID
export const getGroup = async (req: Request, res: Response) => {
  const group = await Group.findById(req.params.groupId).populate('students tasks supervisor board')
  if (!group) {
    throw new NotFoundError("Group not found")
  }
  res.json(group);
};

// Assign mark to a group
export const assignMarkToGroup = async (req: Request, res: Response) => {
  const groupId = req.params.groupId;
  const { supervisorMarks } = req.body;

  const schema = Joi.object({
    groupId: Joi.string().required(), // Assuming groupId is a string representing ObjectId
    supervisorMarks: Joi.object({
      isReleased: Joi.boolean().required(),
      studentMarks: Joi.array().items(
        Joi.object({
          student: Joi.string().required(), // Assuming student is a string representing ObjectId
          preDefence: Joi.number().integer().min(0).max(5).required(),
          defence: Joi.number().integer().min(0).max(5).required()
        })
      ).required()
    }).required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errors = error.details.map(err => {
      return {
        msg: err.message,
        type: err.context?.label!
      }
    });
    throw new RequestValidationError(errors);
  }

  // Find the group by ID
  const group = await Group.findById(groupId);

  if (!group) {
    throw new NotFoundError("Group not found");
  }
  supervisorMarks.isAssigned = true;
  group.supervisorMarks = supervisorMarks

  // Save the updated group
  await group.save();

  res.json(group);
};


// Create a group creation request
export const createGroupRequest = async (req: Request, res: Response) => {
  // check if user don't have any active group then allow the group request
  const { initiator, students, supervisors, description, name, semester, semesterYear } = req.body;
  const studentIds = []; // To store the IDs of students

  // check if active group then don't allow them to make request
  // Joi validator for the request payload
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    students: Joi.array().min(2).max(3).items(Joi.string().email().trim().required()),
    supervisors: Joi.array().length(3).items(Joi.string().trim().required()),
    initiator: Joi.string().required(),
    semester: Joi.string().required(),
    semesterYear: Joi.number().required(),
    supervisor: Joi.optional()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errors = error.details.map(err => {
      return {
        msg: err.message,
        type: err.context?.label!
      }
    });
    throw new RequestValidationError(errors);
  }

  // Validate students by checking if they exist in the database
  for (const studentEmail of students) {
    const student = await User.findOne({
      email: studentEmail.trim(),
      role: Roles.Student,
    });
    if (!student) {
      return res
        .status(400)
        .json({ error: `Student with email ${studentEmail} not found.` });
    }
    studentIds.push(student.id); // Store the student ID
  }

  // Find groups that match the query
  const activeGroups = await Group.find({ students: { $in: studentIds } });

  if (activeGroups.length > 0) {
    throw new BadRequestError("Student already have active group.")
  }

  // Check if the students have pending group requests
  const pendingRequests = await GroupRequest.find({
    students: { $in: studentIds },
    status: 'pending',
  });
  if (pendingRequests.length > 0) {
    throw new BadRequestError('Students already have pending group requests.');
  }


  const requestUser = await User.findById(initiator);

  // Create a group request for each supervisor
  for (const supervisorId of supervisors) {
    // Check if the supervisor exists
    const supervisor = await User.findById(supervisorId);
    if (!supervisor || supervisor.role !== Roles.Supervisor) {
      throw new BadRequestError(`Supervisor with ID ${supervisorId} not found.`);
    }

    // Create a group request
    const groupRequest = new GroupRequest({
      name,
      initiator,
      students: studentIds, // Use the IDs of validated students
      supervisor: supervisorId,
      status: 'pending',
      group: null, // Initialize with no associated group
      description,
      semester,
      semesterYear,
    });

    // Create a notification
    const notification = new Notification({
      from: initiator,
      to: supervisorId,
      title: 'Group request received',
      description: `Student ${requestUser?.name} with ID Number ${requestUser?.idNumber} sent a new group request with thesis title ${name}.`,
    });

    await notification.save();
    await groupRequest.save();
  }

  res.json({ message: "Group request sent successfully" });
};

// Accept a group creation request
export const acceptGroupRequest = async (req: Request, res: Response) => {
  const requestId = req.params.requestId;

  const groupRequest = await GroupRequest.findById(requestId).populate("students");
  if (!groupRequest) {
    throw new NotFoundError("Group request not found")
  }

  if (groupRequest.status !== "pending") {
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

  const group = new Group({
    name: groupRequest.name, // You can set the group name here
    supervisor: groupRequest.supervisor,
    students: groupRequest.students,
    tasks: [], // Initialize with an empty task list
    chat: null, // Initialize with no chat
    semester: groupRequest.semester,
    semesterYear: groupRequest.semesterYear,
    boardMarks: {
      isAssigned: false,
      isReleased: false,
      studentMarks: studentMarks
    },
    supervisorMarks: {
      isReleased: false,
      isAssigned: false,
      studentMarks: studentMarks
    },
    boardComments: []
  });

  await group.save();

  // Delete all pending group requests
  await GroupRequest.deleteMany({ students: { $in: groupStudents } });

  for (const student of groupStudents) {
    const notification = new Notification({
      from: groupRequest.supervisor,
      title: "Request accepted",
      description: `Group request accepted.`,
      group: group._id,
      to: student._id
    })

    await notification.save();
  }

  res.json({ message: "Group request accepted", group });
};

export const rejectGroupRequest = async (req: Request, res: Response) => {
  const requestId = req.params.requestId;

  const groupRequest = await GroupRequest.findById(requestId).populate("students supervisor");
  if (!groupRequest) {
    throw new NotFoundError("Group request not found")
  }

  if (groupRequest.status !== "pending") {
    throw new BadRequestError('Invalid request status');
  }

  groupRequest.status = "rejected";

  await groupRequest.save();

  for (const student of groupRequest.students) {
    const notification = new Notification({
      from: groupRequest.supervisor,
      title: "Request rejected",
      description: `Group request rejected.`,
      to: student._id
    })

    await notification.save();
  }

  res.send(groupRequest);
}

// Create a new task for a group
export const createGroupTask = async (req: Request, res: Response) => {
  const { description, title, dueDate, supervisor } = req.body;

  const groupId = req.params.groupId;

  const supervisorDocuments = req.files as UploadedFile[];

  const task = new Task({
    title,
    description,
    supervisor,
    supervisorDocuments,
    dueDate,
    submitted: false, // Initialize as not submitted
  });

  await task.save();

  const group = await Group.findById(groupId).populate('students');

  if (!group) {
    throw new NotFoundError('Group not found');
  }

  group.tasks.push(task._id);

  await group.save();

  // get all the group students
  const groupStudents = group.students;

  for (const student of groupStudents) {
    const notification = new Notification({
      from: req.currentUser?.id,
      title: "Added new task",
      description: `Added a new task - ${task.title} with due date ${dueDate}`,
      group: group._id,
      to: student._id
    })
    await notification.save();
  }

  res.json({ message: "Task created successfully", task });
};

export const getGroupTasks = async (req: Request, res: Response) => {
  const groupId = req.params.groupId;

  const group = await Group.findById(groupId).populate({
    path: "tasks",
  });
  if (!group) {
    throw new NotFoundError("Group not found")
  }
  res.json(group.tasks);
}

export const getSupervisorTasks = async (req: Request, res: Response) => {
  const supervisorId = req.params.supervisorId;
  const tasks = await Task.find({ supervisor: supervisorId });
  res.json(tasks);
}


// Get chat for a group
export const getChat = async (req: Request, res: Response) => {
  const groupId = req.params.groupId;

  const group = await Group.findById(groupId).populate({
    path: "chat",
    populate: {
      path: "messages.user", // Specify the path to populate within the chat's messages
      model: "User", // Model to use for populating the user field
    },
  });

  if (!group) {
    throw new NotFoundError("Group not found")
  }

  res.json(group.chat);
};

// Add a message to a group's chat
export const addMessageToChat = async (req: Request, res: Response) => {
  const groupId = req.params.groupId;
  const { user, content, document } = req.body;

  const chatMessage = {
    user,
    content,
    document,
    timestamp: new Date(),
  };

  const group = await Group.findById(groupId).populate("chat");
  if (!group) {
    throw new NotFoundError("Group not found")
  }

  if (!group.chat) {
    // Create a new Chat document
    const chat = new Chat({ group: group._id, messages: [chatMessage] });

    // Save the chat to the database
    await chat.save();

    // Assign the chat's ObjectId to group.chat
    group.chat = chat._id;
  } else {
    // 'group.chat' is a ChatModel
    // TypeScript recognizes it as ChatModel, proceed with chat operations
    const chat = group.chat as unknown as ChatModel;

    // Push the chat message to the existing chat
    chat.messages.push(chatMessage);

    await chat.save();
  }
  await group.save();

  res.json({ message: "Message added to chat", chatMessage });
};

export const getGroupRequestsByStudent = async (req: Request, res: Response) => {
  // Fetch all group requests associated with the specified supervisor
  const studentId = req.currentUser?.id;
  const groupRequests = await GroupRequest.find({ students: { $in: [studentId] } });
  res.json({ groupRequests });
};


export const getGroupRequests = async (req: Request, res: Response) => {
  const { supervisorId } = req.params; // You might want to extract the supervisor's ID from the request parameters

  // Fetch all group requests associated with the specified supervisor
  const groupRequests = await GroupRequest.find({
    supervisor: supervisorId,
    status: "pending",
  })
    .populate("initiator") // Populates the 'initiator' field
    .populate("students") // Populates the 'students' field
    .populate("supervisor"); // Populates the 'supervisor' field

  res.json({ groupRequests });
};

export const getGroupByStudentId = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  // Find the group where the specified student is a member
  const group = await Group.findOne({ students: studentId })
    .populate("students") // Populates the 'students' field
    .populate("supervisor"); // Populates the 'supervisor' field

  if (!group)
    throw new NotFoundError("Group not found for the specified student")

  res.json(group);
};

// Submit a task for a group by a student
export const submitStudentTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  // Find the existing task by its ID
  const task = await Task.findById(taskId);

  if (!task) {
    throw new NotFoundError('Task not found')
  }

  // Update the submittedDocument field
  task.submittedDocument = req.file;
  task.submitted = true; // Mark the task as submitted
  await task.save();

  const group = await Group.findOne({ tasks: { $in: [taskId] } });

  const notification = new Notification({
    from: req.currentUser?.id,
    title: "Submitted document",
    description: `Group ${group?.name} submitted document for task ${task.title}.`,
    to: task.supervisor,
    group: group?._id
  })

  await notification.save();

  res.json({ message: 'Task submitted successfully', task });
};
