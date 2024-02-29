import mongoose, { Schema } from 'mongoose';
import { Semester } from './committee';

const groupRequestSchema = new Schema({
  name: String,
  initiator: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the student initiating the request
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Reference to all students in the requested group, including the initiator
  supervisor: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the supervisor accepting the request
  status: String, // e.g., "pending," "accepted," "rejected"
  group: { type: Schema.Types.ObjectId, ref: 'Group' }, // Reference to the group associated with the request (if accepted),
  description: String,
  semester: {
    type: String,
    enum: Object.values(Semester),
    required: true,
  },
  semesterYear: {
    type: Number,
    required: true,
  },
});

export const GroupRequest = mongoose.model('GroupRequest', groupRequestSchema);
