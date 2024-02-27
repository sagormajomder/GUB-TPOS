import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    viewed: {
        type: Boolean,
        default: false, // Initialize the flag as false
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group', // Reference to the Group model
    },
});

export const Notification = mongoose.model('Notification', notificationSchema);