import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
	blog_id: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
	dislikes: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
	],
});

const Rating =
	mongoose.models.Rating || mongoose.model("Rating", ratingSchema, "ratings");

export default Rating;
