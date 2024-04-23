import { isValidObjectId } from "mongoose";
import { object, string, z } from "zod";

const ReviewPayload = {
  body: object({
    rating: string({ required_error: "The rating is required" }),
    comment: string({ required_error: "The comment is required" }),
  }),
};
const ReviewParams = {
  params: object({
    id: string({ required_error: "The review id is required" }),
  }).refine((data) => isValidObjectId(data.id), {
    message: "Enter valid Review id",
  }),
};

export const createReviewSchema = object({ ...ReviewPayload });
export const updateReviewSchema = object({
  ...ReviewPayload,
  ...ReviewParams,
});
export const getReviewSchema = object({
  ...ReviewParams,
});
export type ReviewType = z.infer<typeof ReviewPayload.body>;
