import mongoose from 'mongoose';

interface ChatMessage {
  user: mongoose.Types.ObjectId;
  content: string;
  document?: string;
  timestamp: Date;
}

export interface ChatModel extends mongoose.Document {
  messages: ChatMessage[];
  group: mongoose.Types.ObjectId;
}

const chatSchema = new mongoose.Schema<ChatModel>({
  messages: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: String,
      document: String,
      timestamp: Date,
    },
  ],
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
});

export const Chat = mongoose.model<ChatModel>('Chat', chatSchema);
  