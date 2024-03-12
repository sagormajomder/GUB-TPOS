import { Request, Response } from 'express';
import { Board } from '../models';
import { Group } from '../models';
import { NotFoundError } from '../errors/not-found-error';
import Joi from 'joi';
import { RequestValidationError } from '../errors/request-validation-error';

// Get list of groups for a board
export const getGroupsForBoard = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  const { semester, semesterYear } = req.query;
  const board = await Board.findOne({ members: userId, semester, semesterYear });
  if (!board) {
    return res.json([]);
  }
  const groups = await Group.find({ board: board }).populate("supervisor students")
  res.json(groups);
};

// Get list of groups for a board
export const getBoard = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  const board = await Board.findOne({ members: userId }).populate('members');
  if (!board) {
    throw new NotFoundError('Board not found')
  }
  res.json(board);
};

// Add comment to a group
export const addCommentToGroup = async (req: Request, res: Response) => {
  try {
    const groupId = req.params.groupId;
    const { comment } = req.body;

    // Assuming you have a 'comments' field in the Group model
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { comments: comment } },
      { new: true }
    );

    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Remove comment from a group
export const removeCommentFromGroup = async (req: Request, res: Response) => {
  try {
    const groupId = req.params.groupId;
    const { commentId } = req.body;

    // Assuming you have a 'comments' field in the Group model
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Assign mark to a group
export const assignMarkToGroup = async (req: Request, res: Response) => {
  const groupId = req.params.groupId;
  const { boardMarks } = req.body;

  const schema = Joi.object({
    groupId: Joi.string().required(), // Assuming groupId is a string representing ObjectId
    boardMarks: Joi.object({
      isReleased: Joi.boolean().required(),
      studentMarks: Joi.array().items(
        Joi.object({
          student: Joi.string().required(), // Assuming student is a string representing ObjectId
          preDefence: Joi.number().integer().min(0).max(5).required(),
          defence: Joi.number().integer().min(0).max(5).required()
        })
      ).required()
    }).required()
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

  // Find the group by ID
  const group = await Group.findById(groupId);

  if (!group) {
    throw new NotFoundError("Group not found");
  }
  boardMarks.isAssigned = true;
  group.boardMarks = boardMarks

  // Save the updated group
  await group.save();

  res.json(group);
};
