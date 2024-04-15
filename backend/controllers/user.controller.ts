import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  createUser,
  findUserByEmail,
  getUserByEmail,
} from "../services/user.service";
import { createToken } from "../utils/token";
import { comparePasswords } from "../utils/comparePasswords";
import { verify } from "crypto";

export const createUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    const isUserExist = await getUserByEmail(email);

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
      data: { username: username.username, email: user.email },
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
      // maxAge: 60 * 15 * 1000,
      maxAge: 1,
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 1000 * 24 * 365,
      sameSite: "strict",
    });
    res.json({ message: "User log in successfully" });
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
