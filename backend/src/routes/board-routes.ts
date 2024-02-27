import express from 'express';
import {
  getGroupsForBoard,
  addCommentToGroup,
  removeCommentFromGroup,
  assignMarkToGroup,
  getBoard,
} from '../controllers/board-controller';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

// Get list of groups for a board
router.get('/groups',currentUser, getGroupsForBoard);

// Add comment to a group
router.post('/:groupId/comments', addCommentToGroup);

// Remove comment from a group
router.delete('/:groupId/comments', removeCommentFromGroup);

// Assign mark to a group
router.post('/assignMarkToGroup/:groupId', assignMarkToGroup);

// Get list of groups for a board
router.get('/',currentUser, getBoard);

export default router;
