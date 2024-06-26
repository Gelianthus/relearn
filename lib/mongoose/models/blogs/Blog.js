import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
	code_name: { type: String, unique: true },
	title: String,
	content: String,
	categories: [{ type: String, unique: false }],
});

const Blog =
	mongoose.models.Blog || mongoose.model("Blog", blogSchema, "blogs");

export default Blog;
