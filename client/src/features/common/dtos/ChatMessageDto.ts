import { User } from "../../account/models/User";

export interface ChatMessageDto {
    user: User;
    group: string;
    content: string;
    document?: string;
    timestamp: Date;
  }