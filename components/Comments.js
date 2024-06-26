"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Comments({ post_id }) {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [noComments, setNoComments] = useState(false);

	useEffect(() => {
		const getComments = async () => {
			const res = await fetch(`/api/open-forum/comments?post_id=${post_id}`, {
				method: "GET",
				cache: "no-cache",
			});
			if (res.ok) {
				const data = await res.json();
				setComments(data.comments);
				setLoading(false);
				if (comments.length < 1) {
					setNoComments(true);
				}
			}
		};
		getComments();
	}, []);

	return (
		<>
			{loading ? (
				<p className="m-4 text-center font-medium text-2xl">Loading...</p>
			) : (
				<div className="flex flex-col gap-4">
					{comments.map((comment) => {
						const { comment_by } = comment;

						return (
							<div
								className="border p-4"
								key={comment?._id}
							>
								<div>
									<Image
										src={comment_by?.profile_picture.img_src}
										alt={comment_by?.profile_picture.img_alt}
									/>
								</div>
								<span className="block">{comment_by?.name}</span>
								<p>{comment?.comment}</p>
							</div>
						);
					})}
				</div>
			)}
			{noComments && (
				<p className="border-2 m-4 text-center font-medium text-2xl">
					No comments yet
				</p>
			)}
		</>
	);
}
