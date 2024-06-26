"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import mongoose from "mongoose";
import { userStore } from "@/lib/zustand/userStore";
import Comments from "@/components/Comments";
import AddComment from "@/components/AddComment";

export default function PostPage({ params }) {
	const { id } = params;
	const { user } = userStore();
	const [post, setPost] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			redirect("/open-forum");
		}
		const getPost = async () => {
			const res = await fetch(`/api/open-forum/post?post_id=${id}`, {
				method: "GET",
				cache: "no-cache",
			});
			if (res.ok) {
				const data = await res.json();
				setPost(data.post);
				setLoading(false);
			} else {
				const data = await res.json();
				window.alert(data.message);
				redirect("/open-forum");
			}
		};
		getPost();
	}, []);

	const voteHandle = async (voteStatus) => {
		if (user === null) {
			window.alert("Must be signed in to perform this action.");
			return;
		}

		const res = await fetch(`/api/open-forum/post`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				user_email: user?.email,
				post_id: id,
				vote_status: voteStatus,
			}),
		});

		if (res.ok) {
			const data = await res.json();
			setPost(data.post);
		} else {
			const data = await res.json();
			window.alert(data.message);
		}
	};

	return (
		<>
			{loading ? (
				<p className="m-4 text-center font-medium text-2xl">Loading...</p>
			) : (
				<div className="p-4">
					<div className="flex flex-row gap-4 mb-2 items-center px-2">
						<Image
							src={"/images/blogs/category-icons/artist-icon.webp"}
							alt="Default image for users"
							width={32}
							height={32}
							className="rounded-full"
						/>
						<span className="font-medium">{post?.screen_name}</span>
					</div>
					<div className="block">
						<p className="px-2">{post?.content}</p>
					</div>
					<div className="mt-4 flex flex-row gap-4 justify-between items-center px-2">
						<div className="flex flex-row gap-4 items-center">
							<div className="inline-block w-fit text-sm">
								<button
									onClick={() => {
										voteHandle("upvote");
									}}
								>
									<span
										className={`${
											post?.upvote.includes(user?.email)
												? "text-blue-600"
												: "text-neutral-700"
										} google-icon-fill-1 material-symbols-outlined align-bottom google-icon-wght-300 google-icon-size-20  hover:text-blue-700 active:text-blue-800`}
									>
										thumb_up
									</span>
								</button>

								<span className="ml-1">
									{post?.upvote.length - post?.downvote.length}
								</span>
								<button
									onClick={() => {
										voteHandle("downvote");
									}}
									className="ml-1"
								>
									<span
										className={`${
											post?.downvote.includes(user?.email)
												? "text-red-600"
												: "text-neutral-700"
										} google-icon-fill-1 material-symbols-outlined align-bottom google-icon-wght-300 google-icon-size-20 text-neutral-700 hover:text-red-700 active:text-red-800`}
									>
										thumb_down
									</span>
								</button>
							</div>
						</div>
						<span className="text-xs text-neutral-700">{post?.createdAt}</span>
					</div>
					<AddComment />
					<Comments post_id={id} />
				</div>
			)}
		</>
	);
}
