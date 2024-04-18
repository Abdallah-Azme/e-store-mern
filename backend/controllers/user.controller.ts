import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByIdAndDelete,
  getAllUsers,
} from "../services/user.service";
import { comparePasswords } from "../utils/comparePasswords";
import { createToken } from "../utils/token";

export const createUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    const isUserExist = await findUserByEmail(email);

    if (isUserExist) {
      res.json({ message: "Sorry but this Email is already in use" });
    }

    const user = await createUser({ username, password, email });

    const verifyToken = createToken({ id: user._id }, { expiresIn: "15m" });
    const refreshToken = createToken({ id: user._id }, { expiresIn: "1y" });

    res.cookie("verifyToken", verifyToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 1000 * 60 * 15,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    res.status(201).json({
      message: "Created user successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
);

export const loginUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.json({ message: "Please enter valid credentials" });
    }

    const isPasswordsValid = await comparePasswords(password, user.password);
    if (!isPasswordsValid) {
      return res.json({ message: "Please enter valid credentials" });
    }

    const verifyToken = createToken(
      { id: user._id },
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = createToken(
      { id: user._id },
      {
        expiresIn: "1y",
      }
    );

    res.cookie("verifyToken", verifyToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 15 * 1000,
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 1000 * 24 * 365,
      sameSite: "strict",
    });
    res.json({
      message: "User log in successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
);

export const logoutHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.cookie("verifyToken", "", {
      httpOnly: true,
      maxAge: -1,
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
      maxAge: -1,
    });
    res.json({ message: "Log out successfully" });
  }
);

export const getAllUsersHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.json(users);
  }
);

export const meHandler = asyncHandler(async (req: Request, res: Response) => {
  return res.json({ data: res.locals.user });
});

export const updateMeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email } = req.body;
    let user = res.locals.user;

    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    await user.save();
    res.json({
      message: "Update user successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
);

export const deleteUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await findUserByIdAndDelete(id);
    if (!user) {
      return res.json({ message: "There is no user with that id" });
    }

    return res.json({ message: "The use has been deleted" });
  }
);

export const getUserByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await findUserById(id);
    if (!user) {
      return res.json({ message: "There is no user with that id" });
    }

    return res.json({
      message: "Find a user",
      data: {
        username: user.username,
        email: user.email,
      },
    });
  }
);
export const updateUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email } = req.body;
    let user = await findUserById(id);
    if (!user) {
      return res.json({ message: "There is no user with that id" });
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    await user.save();
    return res.json({
      message: "Updated the user",
      data: {
        username: user.username,
        email: user.email,
      },
    });
  }
);
