import express from 'express';
import {
  getSupervisors,
  createSupervisor,
  getBoardMembers,
  createBoardMember,
  getNotices,
  createNotice,
  getGroups,
  getGroupRequests,
  assignSupervisorToGroup,
  approveGroupRequests,
  deleteGroupRequest,
  getSupervisorById,
  updateSupervisor,
  getFacalties,
  getLatestSemesterInfo,
  getBoardMember,
  assignBoardToGroup,
  getAllSupervisorSemesters,
  getBoardSemesters,
  getGroupSemesters,
  getPendingGroups,
  assignSupervisorToPendingGroup,
  contactBoard,
  contactSupervisor,
  getBoardContactsByUser,
  getSupervisorContactsByUser,
} from '../controllers/committee-controller';
import { currentUser } from '../middlewares/current-user';
import { upload } from '../middlewares/file-upload';

const router = express.Router();

// get list of facalties
router.get('/facalties', getFacalties);

// get latest semester info
router.get('/latest-semester', getLatestSemesterInfo);

// get list of supervisor
router.get('/supervisors/semesters', getAllSupervisorSemesters);

// get list of supervisor
router.get('/supervisors', getSupervisors);

// get supervisor by id
router.get('/supervisors/:id', getSupervisorById);

// delete supervisor by id
router.put('/supervisors/:id', updateSupervisor);

// supervisor create
router.post('/supervisors', createSupervisor);

// get list of board member
router.get('/boardMembers/:id', getBoardMember);

// get list of board member
router.get('/board/semesters', getBoardSemesters);

// get list of board member
router.get('/boardMembers', getBoardMembers);

// board member create
router.post('/boardMembers', createBoardMember);

// notices
router.get('/notices', getNotices);

// notice create
router.post('/notices', [currentUser, upload.array('files', 5)], createNotice);

// groups
router.get('/groups', [currentUser], getGroups);

// groups
router.get('/group-semesters', getGroupSemesters);

// group requests
router.get('/groupRequests', getGroupRequests);

// group requests
router.get('/pending-groups', getPendingGroups);

// assign supervisor to a group
router.post('/assignSupervisorToGroup', assignSupervisorToGroup);

// assign supervisor to a pending group
router.post('/assignSupervisorToPendingGroup', assignSupervisorToPendingGroup);


// assign supervisor to a group
router.post('/assignBoardToGroup', assignBoardToGroup);

// approve group requests
router.post('/approveGroupRequests', approveGroupRequests);

// delete group requests
router.delete('/deleteGroupRequest/:requestId', deleteGroupRequest);

// Route for contacting the board
router.post('/contact-board', [upload.array('files', 5)], contactBoard);

// Route for contacting the supervisor
router.post('/contact-supervisor', [upload.array('files', 5)], contactSupervisor);

// Route for getting board contacts by user ID
router.get('/board-contacts/:userId', getBoardContactsByUser);

// Route for getting supervisor contacts by user ID
router.get('/supervisor-contacts/:userId', getSupervisorContactsByUser);

export default router;
