export interface User {
    _id?: string
    id?: string,
    imgUrl?: string
    name: string,
    email: string,
    idNumber?: string;
    role: string,
    groups?: string
    isActive: boolean,
    researchInterests?: string[]
}