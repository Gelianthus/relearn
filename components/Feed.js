"use client";

import { useEffect } from "react";
import { postStore } from "@/lib/zustand/postStore";
import Post from "./Post";

export default function Feed() {
	const { posts, getPosts } = postStore();

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="px-4">
			{posts.map((post) => {
				return (
					<Post
						key={post?._id}
						post={post}
					/>
				);
			})}
		</div>
	);
}
