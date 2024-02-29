import mongoose, { Schema } from 'mongoose';
import { Semester } from './committee';

// Define the interface for Student Marks
interface StudentMark {
  student: Schema.Types.ObjectId;
  preDefence: number;
  defence: number;
  criteria: {
    description: string;
    markPercentage: number;
  };
}


const groupSchema = new Schema({
  name: String,
  supervisor: { type: Schema.Types.ObjectId, ref: 'User' },
  board: { type: Schema.Types.ObjectId, ref: 'Board' },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
  boardMarks: {
    isReleased: { type: Boolean, default: false },
    isAssigned: {type: Boolean, default: false},
    studentMarks: [{
      student: { type: Schema.Types.ObjectId, ref: 'User' },
      preDefence: { type: Number, required: true, min: [0, 'Marks should be minimum 0'], max: [5, 'Marks should be maximum 5'] },
      defence: { type: Number, required: true, min: [0, 'Marks should be minimum 0'], max: [5, 'Marks should be maximum 5'] },
      criteria: [{
        description: String,
        markPercentage: Number
      }]
    }]
  },
  supervisorMarks: {
    isReleased: { type: Boolean, default: false },
    isAssigned: {type: Boolean, default: false},
    studentMarks: [{
      student: { type: Schema.Types.ObjectId, ref: 'User' },
      preDefence: { type: Number, required: true, min: [0, 'Marks should be minimum 0'], max: [5, 'Marks should be maximum 5'] },
      defence: { type: Number, required: true, min: [0, 'Marks should be minimum 0'], max: [5, 'Marks should be maximum 5'] },
      criteria: [{
        description: String,
        markPercentage: Number
      }]
    }]
  },
  boardComments: {
    comments: [{ content: String, timestamp: Date }],
  },
  semester: {
    type: String,
    enum: Object.values(Semester),
    required: true,
  },
  semesterYear: {
    type: Number,
    required: true,
  },
  grade: String
});

export const Group = mongoose.model('Group', groupSchema);
