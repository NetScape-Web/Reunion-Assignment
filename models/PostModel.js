import { model, Schema } from "mongoose";

const PostSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
});

const Post = new model("Post", PostSchema);
export default Post;
