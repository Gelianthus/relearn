import mongoConnection from "@/lib/mongoose/mongoConnection";
import Rating from "@/lib/mongoose/models/blogs/Rating";
import { NextResponse } from "next/server";
import { Trykker } from "next/font/google";

export async function GET(req, res) {
	await mongoConnection();
	try {
		const { searchParams } = new URL(req.url);
		const blog_id = searchParams.get("blog-id");

		if (!blog_id)
			return NextResponse.json(
				{ message: "Blog ID required" },
				{ status: 400 }
			);

		const rating = await Rating.find({ blog_id: blog_id });

		if (rating) {
			return NextResponse.json({ rating: rating }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Rating not found" },
				{ status: 404 }
			);
		}
	} catch (error) {
		console.error(error.message);
		return NextResponse.json(
			{ message: error.message || "Internal Serveer Error" },
			{ status: error.code || 500 }
		);
	}
}

// export async function POST() {
// 	await mongoConnection();
// 	try {
// 		const { blog_id } = await req.json();
// 		if (!blog_id)
// 			return NextResponse.json(
// 				{ message: "Blog ID required" },
// 				{ status: 400 }
// 			);
// 		const createRating = await Rating.create({ blog_id: blog_id });

// 		if (createRating) {
// 			return NextResponse.json(
// 				{ message: "Successfully created a Rating" },
// 				{ status: 201 }
// 			);
// 		} else {
// 			return NextResponse.json(
// 				{ message: "Failed to create Rating" },
// 				{ status: 500 }
// 			);
// 		}
// 	} catch (error) {
// 		console.error(error.message);
// 		return NextResponse.json(
// 			{ message: error.message || "Internal Serveer Error" },
// 			{ status: error.code || 500 }
// 		);
// 	}
// }

export async function PUT() {}
