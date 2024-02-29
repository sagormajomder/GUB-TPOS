import express from 'express';
import { createGroup, getGroups, getGroup, createGroupRequest, acceptGroupRequest, createGroupTask, getChat, addMessageToChat, getGroupRequests, getGroupByStudentId, getGroupTasks, getSupervisorTasks, submitStudentTask, getSupervisors, assignMarkToGroup, getGroupRequestsByStudent, rejectGroupRequest } from '../controllers/group-controller';
import { upload } from '../middlewares/file-upload';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

// Create a new group
router.post('/', currentUser, createGroup);

// Get all groups
router.get('/', currentUser, getGroups);

// Get a specific group by ID
router.get('/:groupId', getGroup);

// Create a group creation request
router.post('/group-requests', currentUser, createGroupRequest);

// Accept a group creation request
router.post('/group-requests/:requestId/accept', acceptGroupRequest);

// Accept a group creation request
router.delete('/group-requests/:requestId/reject', rejectGroupRequest);

router.get('/group-requests/:supervisorId', currentUser, getGroupRequests);

router.get('/group-requests/student', currentUser, getGroupRequestsByStudent);

// Create a new task for all groups
// router.post('/tasks', [currentUser, upload.array('files', 5)], createGroupsTask);

// Create a new task for a group
router.post('/:groupId/tasks', [currentUser, upload.array('files', 5)], createGroupTask);

// get all tasks by group
router.get('/:groupId/tasks', currentUser, getGroupTasks);

// get all supervisors
router.get('/supervisors', getSupervisors);

router.put('/tasks/:taskId/submit-task', [currentUser, upload.single('file')], submitStudentTask);

// Create a new task for a group
router.get('/supervisor/tasks/:supervisorId', currentUser, getSupervisorTasks);

// Get chat for a group
router.get('/:groupId/chat', currentUser, getChat);

// Add a message to a group's chat
router.post('/:groupId/chat/messages', currentUser, addMessageToChat);

router.get('/student/:studentId', currentUser, getGroupByStudentId);

// Assign mark to a group
router.post('/assignMarkToGroup/:groupId', assignMarkToGroup);


export default router;
