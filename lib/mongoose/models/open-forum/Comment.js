import mongoose, { Schema } from "mongoose";
import { generateRandomString } from "@/util/randomString";

const randomStr = `Anonymous${generateRandomString(13)}`;

const commentSchema = new Schema(
	{
		comment_for: { type: Schema.Types.ObjectId, ref: "Post" },
		comment_by: { type: Schema.Types.ObjectId, ref: "User" },
		screen_name: {
			type: String,
			default: randomStr,
			maxLength: 30,
		},
		comment: { type: String, maxLength: 500, minLength: 1 },
	},
	{
		timestamps: true,
	}
);

const Comment =
	mongoose.models.Comment ||
	mongoose.model("Comment", commentSchema, "comments");

export default Comment;
