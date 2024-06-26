"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import { userStore } from "@/lib/zustand/userStore";

export default function AddComment() {
	const { user } = userStore();
	const [commentFormVisible, setCommentFormVisible] = useState(false);

	const addCommentHandle = () => {
		if (user === null) {
			window.alert("Must be signed in to perform this action.");
		} else {
			setCommentFormVisible(true);
		}
	};

	return (
		<div className="mt-8">
			<button
				className="mx-auto text-xl font-medium flex flex-row gap-2 items-center border-2 border-neutral-600 p-1 text-neutral-600 hover:border-rose-500 hover:text-rose-600 active:text-rose-800 active:border-rose-700 rounded"
				onClick={addCommentHandle}
			>
				<span>Add Comment</span>
				<span className="material-symbols-outlined">add</span>
			</button>
			<CommentForm
				commentFormVisible={commentFormVisible}
				setCommentFormVisible={setCommentFormVisible}
			/>
		</div>
	);
}
