import { User } from "../../account/models/User";
import { Task } from "../models";

export interface Mark {
    isReleased: boolean;
    isAssigned?: boolean;
    studentMarks: {
      student: string;
      defence: string;
      preDefence: string
    }[];
}
export interface GroupDto {
    _id: string;
    name: string;
    semester: string;
    semesterYear: string;
    supervisor: User;
    students: User[];
    supervisorMarks: Mark
    boardMarks: Mark
    tasks: Task[]
    board: string
}