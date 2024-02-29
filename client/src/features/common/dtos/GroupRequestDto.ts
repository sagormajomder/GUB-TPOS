import { User } from '../../account/models/User';

export interface GroupRequestDto {
  _id?: string;
  name: string;
  initiator: User;
  students: User[];
  supervisor: User;
  status?: string;
  group?: string;
  description: string;
  semester: string;
  semesterYear: number;
}
