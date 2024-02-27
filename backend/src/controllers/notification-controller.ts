import { Request, Response } from 'express';
import { Notification } from '../models/notification';

// Function to count unread notifications by the "to" user
export const countUnreadNotificationsByUser = async (req: Request, res: Response) => {
    const userId = req.currentUser?.id;
    const count = await Notification.countDocuments({ to: userId, viewed: false });
    res.json({ count });
};

// Function to get notifications by the "to" user
export const getNotificationsByUser = async (req: Request, res: Response) => {
    const userId = req.currentUser?.id;
    const notifications = await Notification.find({ to: userId });
    res.json(notifications);
};


