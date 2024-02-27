import express from 'express';
import { countUnreadNotificationsByUser, getNotificationsByUser } from '../controllers/notification-controller';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

// Count all notification
router.get('/unread-notifications', currentUser, countUnreadNotificationsByUser);

router.put('/mark-as-read', currentUser, getNotificationsByUser);

// Get a specific group by ID
router.get('/', currentUser, getNotificationsByUser);


export default router;
