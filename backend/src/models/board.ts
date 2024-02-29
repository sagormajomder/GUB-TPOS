import mongoose, { Document, Schema } from 'mongoose';
import { Semester } from './committee';

// Interface for Board Document
interface BoardDoc extends Document {
  title: string;
  members: mongoose.Types.ObjectId[];
  semester: Semester;
  semesterYear: number;
  groups: mongoose.Types.ObjectId[]; // Reference to Group model
}

// Schema for Board
const boardSchema = new Schema<BoardDoc>({
  title: {
    type: String,
    required: true,
  },
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
  groups: [{ type: Schema.Types.ObjectId,ref: 'Group'}],
});

// Model for Board
const Board = mongoose.model<BoardDoc>('Board', boardSchema);

export { Board };
