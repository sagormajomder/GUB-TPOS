import supervisorImage from "../../../../assets/images/teacher.gif";
import studentImage from "../../../../assets/images/students.gif";
import boardMemberImage from "../../../../assets/images/board.gif";
import committeeImage from "../../../../assets/images/committee.gif";

export const categories = [
  {
    name: 'Supervisor',
    imageUrl: supervisorImage,
    url: '/login?role=Supervisor',
  },
  {
    name: 'Student',
    imageUrl: studentImage,
    url: '/login?role=Student',
  },
  {
    name: 'Thesis Committee',
    imageUrl: committeeImage,
    url: '/login?role=ThesisCommittee',
  },
  {
    name: 'Board Member',
    imageUrl: boardMemberImage,
    url: '/login?role=BoardMember',
  },
]

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

export type Category = ElementType<typeof categories>
