import mongoose, { Document, Schema } from 'mongoose';
import { Semester } from './committee';

// Interface for Supervisor Document
interface SupervisorDoc extends Document {
  members: mongoose.Types.ObjectId[]; // Reference to User model
  semester: Semester;
  semesterYear: number;
}

// Schema for Supervisor
const supervisorSchema = new Schema<SupervisorDoc>({
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

// Model for Supervisor
const Supervisor = mongoose.model<SupervisorDoc>('Supervisor', supervisorSchema);

export { Supervisor };
