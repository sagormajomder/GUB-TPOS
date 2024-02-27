import mongoose from "mongoose";
import { User, UserAttrs } from "./models/user"; // Adjust the path to your model
import * as dotenv from "dotenv";
import Roles from "./enums/Roles";
import { Committee, Semester, Supervisor } from "./models";
import { teachers } from "./data/teachers";

dotenv.config({ path: __dirname + "/.env" });

const semester = Semester.SPRING;
const semesterYear = 2024;
const defaultPassword = "abc123";
const maxGroups = 20;

// Define the initial user data as an array
const studentsData: UserAttrs[] = [
  {
    name: "Test Student1",
    email: "student1@gmail.com",
    password: defaultPassword,
    role: Roles.Student
  },
  {
    name: "Test Student2",
    email: "student2@gmail.com",
    password: defaultPassword,
    role: Roles.Student,
    idNumber: '123456'
  },
  {
    name: "Test Student3",
    email: "student3@gmail.com",
    password: defaultPassword,
    role: Roles.Student,
    idNumber: '123556'
  }
]
const committeesData: UserAttrs[] = [
  {
    name: "Thesis Committee",
    email: "committee@gmail.com",
    password: defaultPassword,
    role: Roles.ThesisCommittee,
    idNumber: '123656'
  }
];

async function seedDatabase() {
  // Check if there are any existing users
  const committees = await User.find({ role: Roles.ThesisCommittee });
  const supervisors = await User.find({ role: Roles.Supervisor });
  const students = await User.find({ role: Roles.Student });

  // create committee
  // create students

  if (students.length === 0) {
    // If no users exist, create and insert new users
    for (const userData of studentsData) {
      const user = User.build(userData);
      await user.save();
    }
    console.log("Students records inserted.");
  }
  if (committees.length === 0) {
    // If no users exist, create and insert new users
    for (const userData of committeesData) {
      const user = User.build(userData);
      await user.save();
      const committee = new Committee({
        semester,
        semesterYear,
        members: [user.id] // Wrap user ID in an object
      })
      await committee.save();
    }
    console.log("Committees records inserted.");
  }

  const teacherUsers = [];
  if (supervisors.length === 0) {
    // If no users exist, create and insert new users
    for (const teacherData of teachers) {
      const formattedUser: UserAttrs = {
        name: teacherData.name,
        email: teacherData.email,
        designation: teacherData.designation,
        password: defaultPassword,
        role: Roles.Supervisor,
        researchInterests: teacherData.researchInterest,
        department: teacherData.department,
        imgUrl: teacherData.imgUrl,
        isActive: teacherData.isAvailable,
        maxGroups: maxGroups,
        currentGroups: 0
      }
      const user = User.build(formattedUser);
      await user.save();
      teacherUsers.push(user.id)
    }

    const supervisor = await Supervisor.findOne({
      semester: semester,
      semesterYear: semesterYear,
    })

    if(!supervisor) {
      await Supervisor.create({
        members: teacherUsers,
        semester,
        semesterYear,
      });
    } else {
      supervisor.members = teacherUsers;
      await supervisor.save();
    }
    console.log("Supervisors records inserted.");
  }
}

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("Connected to MongoDB");
    await seedDatabase();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();
