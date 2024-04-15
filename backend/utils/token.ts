import jwt from "jsonwebtoken";

export const createToken = (
  data: object,
  options?: jwt.SignOptions | undefined
) => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("Cannot access the private key");
  }
  return jwt.sign(data, process.env.PRIVATE_KEY, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyToken = (token: string) => {
  if (!process.env.PUBLICKEY) {
    throw new Error("Cannot access the public key");
  }
  try {
    const decoded = jwt.verify(token, process.env.PUBLICKEY);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
