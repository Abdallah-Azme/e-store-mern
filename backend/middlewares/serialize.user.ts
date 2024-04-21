import { NextFunction, Request, Response } from "express";
import { createToken, verifyToken } from "../utils/token";

export const serializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.verifyToken;
  const refreshToken = req.cookies.refreshToken;

  // check if there is any token
  if (!accessToken && !refreshToken) {
    // there is no token what so ever but if the request is required authenticate the require user middleware will stop the request
    return next();
  }

  const { decoded, expired } = verifyToken(accessToken);
  // there is an access token and it still valid alhmdllah
  if (decoded) {
    res.locals.decoded = decoded;
    return next();
  }

  // the token is expired but there is a refresh token so gonna check if the refresh token is valid if so gonna reissue an access token
  if (!expired && refreshToken) {
    try {
      const { decoded } = verifyToken(refreshToken);
      //@ts-ignore
      if (decoded && decoded.id) {
        const newAccessToken = createToken(
          //@ts-ignore
          { id: decoded.id },
          {
            expiresIn: "15m",
          }
        );
        const x = verifyToken(newAccessToken);
        res.cookie("verifyToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 15 * 1000,
          sameSite: "strict",
        });
        res.locals.decoded = decoded;
      }
    } catch (error) {
      next();
    }
  }

  next();
};
