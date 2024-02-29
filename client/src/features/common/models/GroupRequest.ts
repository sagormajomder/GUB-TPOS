export interface GroupRequest {
    _id?: string;
    name: string;
    initiator: string;
    students: string[];
    supervisor: string;
    status?: string;
    group?: string;
    description: string;
    semester: string;
    semesterYear: string;
    supervisors?: string[]
  }
  