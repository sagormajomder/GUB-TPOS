interface Document {
  _id?: string;
  filename: string;
  path: string;
}

export interface Task {
    _id?: string;
    group?: string;
    title: string;
    description: string;
    supervisorDocuments?: Document[];
    submittedDocument?: Document
    files: FileList | null
    dueDate: Date;
    submitted: boolean;
    supervisor?: string;
  }