
export interface Group {
    _id: string;
    name: string;
    supervisor: string; // Change to user information or user ID
    students: string[]; // Change to user information or user IDs
}