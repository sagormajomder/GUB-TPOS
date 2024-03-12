// controllers/account-controller.ts
import { Request, Response } from 'express';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import Roles from '../enums/Roles';
import { Board, Committee, Supervisor } from '../models';
import Joi from "joi";
import { NotFoundError } from '../errors/not-found-error';
import { RequestValidationError } from '../errors/request-validation-error';


export const CurrentUser = (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
};

export const Login = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().valid(Roles.Student, Roles.BoardMember, Roles.Supervisor, Roles.ThesisCommittee)
    });

    const { error } = schema.validate(req.body);

    if (error) {
        const errors = error.details.map(err => {
            return {
                msg: err.message,
                type: err.context?.label!
            }
        });
        throw new RequestValidationError(errors);
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    // Check the user's role and validate against the corresponding model
    if (role === Roles.Supervisor) {
        const supervisor = await Supervisor.findOne({ members: existingUser.id });

        if (!supervisor) {
            throw new BadRequestError('User does not have Supervisor role');
        }
    }

    if (role === Roles.BoardMember) {
        const board = await Board.findOne({ members: existingUser.id });

        if (!board) {
            throw new BadRequestError('User does not have BoardMember role');
        }
    }
    if (role === Roles.ThesisCommittee) {
        const committee = await Committee.findOne({ members: existingUser.id });

        if (!committee) {
            throw new BadRequestError('User does not have ThesisCommittee role');
        }
    }

    const passwordsMatch = await Password.compare(
        existingUser.password,
        password
    );
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email,
            role: role,
            name: existingUser.name,
            idNumber: existingUser.idNumber,
            researchInterests: existingUser.researchInterests
        },
        process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    existingUser.role = role;

    res.status(200).send(existingUser);
}

export const Register = async (req: Request, res: Response) => {
    const { email, password, name, idNumber } = req.body;

    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])?[a-zA-Z\d!@#$%^&*]{5,}$/).required(),
        idNumber: Joi.string().length(9).pattern(/^\d+$/).required(),
        confirmPassword: Joi.optional()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        const errors = error.details.map(err => {
            return {
                msg: err.message,
                type: err.context?.label!
            }
        });
        throw new RequestValidationError(errors);
    }


    let existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    existingUser = await User.findOne({ idNumber });

    if (existingUser)
        throw new BadRequestError('Student with id already registered')

    const user = User.build({ email, password, role: Roles.Student, name, idNumber });
    
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            name: name,
            idNumber: user.idNumber,
            researchInterests: user.researchInterests
        },
        process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
}

export const RegisterSupervisor = async (req: Request, res: Response) => {
    const { email, password, name, researchInterests } = req.body;

    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+green\.edu\.bd$/).required(),
        password: Joi.string().min(5).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])?[a-zA-Z\d!@#$%^&*]{5,}$/).required(),
        researchInterests: Joi.array().items(Joi.string()).min(1).required(),
        confirmPassword: Joi.optional()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        const errors = error.details.map(err => {
            return {
                msg: err.message,
                type: err.context?.label!
            }
        });
        throw new RequestValidationError(errors);
    }

    const latestCommittee = await Committee.findOne()
        .sort({ semesterYear: -1, semester: -1 })
        .exec();

    if (!latestCommittee) {
        throw new NotFoundError('No committees found')
    }

    let supervisor = await Supervisor.findOne({
        semester: latestCommittee.semester,
        semesterYear: latestCommittee.semesterYear,
    });

    if (!supervisor) {
        // create one with current semester and semesterYear
        supervisor = await Supervisor.create({
            members: [],
            semester: latestCommittee.semester,
            semesterYear: latestCommittee.semesterYear,
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password, role: Roles.Supervisor, name, researchInterests });

    await user.save();

    supervisor.members.push(user.id);

    await supervisor.save();

    // Generate JWT
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            name: name,
            researchInterests: user.researchInterests
        },
        process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
}

export const Logout = (req: Request, res: Response) => {
    req.session = null;

    res.send({});
};

// Add a new route handler to get the list of supervisors
export const SupervisorList = async (req: Request, res: Response) => {
    // Fetch all users with the "supervisor" role
    const supervisors = await User.find({ role: Roles.Supervisor });
    res.status(200).send(supervisors);
};

export const UpdateProfile = async (req: Request, res: Response) => {
    const { id, name, researchInterests } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, {
        name,
        researchInterests
    });
    if (!updatedUser) {
        throw new NotFoundError('User not found')
    }

    res.json({ message: 'User updated successfully', task: updatedUser });
}