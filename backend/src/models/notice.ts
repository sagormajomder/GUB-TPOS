// Import required modules
import mongoose, { Schema } from 'mongoose';

enum NoticeFor {
  ALL = 'ALL',
  BOARD = 'BOARD',
  STUDENT = 'STUDENT',
  SUPERVISOR = 'SUPERVISOR'
}

// Define the interface for Notice attributes
export interface NoticeAttrs {
  title: string;
  content: string;
  noticeFor: NoticeFor;
  attachments: string[]
}

// Define the interface for the Notice Document
interface NoticeDoc extends mongoose.Document {
  title: string;
  content: string;
  noticeFor: NoticeFor;
  createdAt: Date;
  attachments: string[]
}

// Define the Notice Schema
const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    noticeFor: {
      type: String,
      enum: Object.values(NoticeFor),
      required: true,
    },
    attachments: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Define the static method to build a Notice document
noticeSchema.statics.build = (attrs: NoticeAttrs) => {
  return new Notice(attrs);
};

// Create the Notice model
const Notice = mongoose.model<NoticeDoc>('Notice', noticeSchema);

// Export the Notice model
export { Notice, NoticeFor };
