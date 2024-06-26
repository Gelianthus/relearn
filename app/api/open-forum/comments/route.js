import Comment from "@/lib/mongoose/models/open-forum/Comment";
import mongoConnection from "@/lib/mongoose/mongoConnection";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	mongoConnection();
	try {
		const { searchParams } = new URL(req.url);
		const post_id = searchParams.get("post_id");
		if (!post_id)
			return NextResponse.json(
				{ message: "Missing information" },
				{ status: 404 }
			);
		const comments = await Comment.find({ comment_for: post_id }).populate(
			"comment_by"
		);
		if (comments) {
			return NextResponse.json({ comments: comments }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to fetch comments" },
				{ status: 400 }
			);
		}
	} catch (err) {
		console.err(err.message || "Failed to fetch comments");
		return NextResponse.json(
			{
				message: err.message || "Failed to fetch comments",
			},
			{ status: err.code || 500 }
		);
	}
}
