import mongoose, { Document, Schema } from 'mongoose';

// Enum for Semester
enum Semester {
  FALL = 'FALL',
  SPRING = 'SPRING',
}

// Interface for Contact
export interface Contact {
  user: mongoose.Types.ObjectId; // Reference to User model
  title: string;
  description: string;
  attachments: string[]; // Assuming attachments are stored as URLs
}

// Interface for Committee Document
interface CommitteeDoc extends Document {
  members: mongoose.Types.ObjectId[];
  semester: Semester;
  semesterYear: number;
  isActive: boolean;
  boardContacts: Contact[];
  supervisorContacts: Contact[];
}

// Schema for Committee
const committeeSchema = new Schema<CommitteeDoc>({
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
  isActive: {
    type: Boolean,
    default: true
  },
  boardContacts: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    title: String,
    description: String,
    attachments: [String]
  }],
  supervisorContacts: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    title: String,
    description: String,
    attachments: [String]
  }]
});

// Model for Committee
const Committee = mongoose.model<CommitteeDoc>('Committee', committeeSchema);

export { Committee, Semester };
