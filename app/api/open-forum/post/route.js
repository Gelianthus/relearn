import Post from "@/lib/mongoose/models/open-forum/Post";
import mongoConnection from "@/lib/mongoose/mongoConnection";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	try {
		const { searchParams } = new URL(req.url);
		const post_id = searchParams.get("post_id");
		const post = await Post.findById(post_id).populate("author");
		if (post) {
			return NextResponse.json({ post: post }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to fetch Post" },
				{ status: 500 }
			);
		}
	} catch (err) {
		console.error(err.message || "Failed to fetch Post");
		return NextResponse.json(
			{ message: err.message || "Failed to fetch Post" },
			{ status: err.code || 500 }
		);
	}
}

export async function PUT(req, res) {
	await mongoConnection();
	try {
		const { user_email, post_id, vote_status } = await req.json();
		if (!user_email || !post_id || !vote_status) {
			return NextResponse.json(
				{ message: "Missing required information" },
				{ status: 404 }
			);
		}
		const post = await Post.findById(post_id).populate("author");

		if (vote_status === "upvote") {
			if (post.upvote.includes(user_email)) {
				const removeUpvote = await Post.findOneAndUpdate(
					{ _id: post_id },
					{ $pull: { upvote: user_email } },
					{ new: true }
				);
				return NextResponse.json({ post: removeUpvote }, { status: 200 });
			} else {
				if (post.downvote.includes(user_email)) {
					const removeDownvote = await Post.findOneAndUpdate(
						{ _id: post_id },
						{ $pull: { downvote: user_email } },
						{ new: true }
					);
					if (removeDownvote) {
						const addUpvote = await Post.findOneAndUpdate(
							{ _id: post_id },
							{ $push: { upvote: user_email } },
							{ new: true }
						);
						return NextResponse.json({ post: addUpvote }, { status: 200 });
					}
				} else {
					const upvote = await Post.findOneAndUpdate(
						{ _id: post_id },
						{ $push: { upvote: user_email } },
						{ new: true }
					);
					return NextResponse.json({ post: upvote }, { status: 200 });
				}
			}
		} else if (vote_status === "downvote") {
			if (post.downvote.includes(user_email)) {
				const removeDownvote = await Post.findOneAndUpdate(
					{ _id: post_id },
					{ $pull: { downvote: user_email } },
					{ new: true }
				);
				return NextResponse.json({ post: removeDownvote }, { status: 200 });
			} else {
				if (post.upvote.includes(user_email)) {
					const removeUpvote = await Post.findOneAndUpdate(
						{ _id: post_id },
						{ $pull: { upvote: user_email } },
						{ new: true }
					);
					if (removeUpvote) {
						const addDownvote = await Post.findOneAndUpdate(
							{ _id: post_id },
							{ $push: { downvote: user_email } },
							{ new: true }
						);
						return NextResponse.json({ post: addDownvote }, { status: 200 });
					}
				} else {
					const downvote = await Post.findOneAndUpdate(
						{ _id: post_id },
						{ $push: { downvote: user_email } },
						{ new: true }
					);
					return NextResponse.json({ post: downvote }, { status: 200 });
				}
			}
		}
	} catch (err) {
		console.error(err.message || "Failed to update Post");
		return NextResponse.json(
			{ message: err.message || "Failed to update Post" },
			{ status: err.code || 500 }
		);
	}
}
