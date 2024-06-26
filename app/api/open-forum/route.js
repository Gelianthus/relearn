import mongoConnection from "@/lib/mongoose/mongoConnection";
import Post from "@/lib/mongoose/models/open-forum/Post";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	try {
		const posts = await Post.find({})
			.populate("author")
			.sort({ createdAt: -1 });
		if (posts) {
			return NextResponse.json({ posts: posts }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to fetch Posts" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error(error.message);
		return NextResponse.json(
			{ message: error.message || "Failed to fetch Posts" },
			{ status: error.code || 500 }
		);
	}
}

export async function POST(req, res) {
	await mongoConnection();
	try {
		const { user_id, screen_name, title, content } = await req.json();

		if (!user_id || !title || !content) {
			return NextResponse.json({ message: "Missing Data" }, { status: 404 });
		}

		const createPost = await Post.create({
			author: user_id,
			screen_name: screen_name === "" ? undefined : screen_name,
			title,
			content,
		});

		if (createPost) {
			const posts = await Post.find({})
				.populate("author")
				.sort({ createdAt: -1 });
			if (!posts)
				return NextResponse.json(
					{ message: "Failed to fetch Posts" },
					{ status: 500 }
				);
			return NextResponse.json(
				{ message: "Successfully created a new Post", posts },
				{ status: 200 }
			);
		}
	} catch (err) {
		console.error(err.message || "Failed to create Post");
		return NextResponse.json(
			{ message: err.message || "Failed to create Post" },
			{ status: err.code || 500 }
		);
	}
}
