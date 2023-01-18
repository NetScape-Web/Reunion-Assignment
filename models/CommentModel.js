import { model, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Comment = new model("Comment", CommentSchema);
export default Comment;
