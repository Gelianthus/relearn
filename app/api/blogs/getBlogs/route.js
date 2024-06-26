import mongoConnection from "@/lib/mongoose/mongoConnection";
import Blog from "@/lib/mongoose/models/blogs/Blog";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	try {
		const blogs = await Blog.find({});
		return NextResponse.json({ blogs }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: error.message },
			{ status: error.status }
		);
	}
}
