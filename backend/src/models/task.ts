import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
  title: String,
  description: String,
  supervisorDocuments: [
    {
      filename: String,
      path: String,
    },
  ],
  submittedDocument:
  {
    filename: String,
    path: String,
  },
  dueDate: Date,
  submitted: { type: Boolean, default: false },
  supervisor: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to a user with the "supervisor" role
});

export const Task = mongoose.model('Task', taskSchema);

export interface UploadedFile {
  filename: string;
  path: string;
  // Add any other properties specific to your file upload middleware
}