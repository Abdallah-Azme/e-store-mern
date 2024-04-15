import mongoose from "mongoose";
import { compare, hash } from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The name is required"],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: [true, "The email has to be unique"],
    },
    password: {
      type: String,
      required: [true, "The password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await hash(this.password, 12);
});

export const User = mongoose.model("User", userSchema);
