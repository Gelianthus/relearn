import mongoose, { Schema } from "mongoose";
import { generateRandomString } from "@/util/randomString";

const randomStr = `Anonymous${generateRandomString(13)}`;

const postSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		screen_name: {
			type: String,
			default: randomStr,
			maxLength: 30,
		},
		title: { type: String, minLength: 1, maxLength: 50 },
		content: { type: String, minLength: 1, maxLength: 2000 },
		upvote: { type: [String], default: [] },
		downvote: { type: [String], default: [] },
	},
	{
		timestamps: true,
	}
);

const Post =
	mongoose.models.Post || mongoose.model("Post", postSchema, "posts");

export default Post;
