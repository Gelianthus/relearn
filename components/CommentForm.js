"use client";

import { useState, useRef, useEffect } from "react";

export default function CommentForm({
	commentFormVisible,
	setCommentFormVisible,
}) {
	const [screenName, setScreenName] = useState("");
	const [comment, setComment] = useState("");

	const commentDialogRef = useRef(null);
	const formRef = useRef(null);

	useEffect(() => {
		if (commentFormVisible) {
			commentDialogRef.current.showModal();
		} else {
			commentDialogRef.current.close();
		}
	}, [commentFormVisible]);

	const formSubmitHandle = () => {};

	return (
		<dialog
			ref={commentDialogRef}
			className="rounded p-6 border-2"
		>
			<form
				ref={formRef}
				className="rounded w-96"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<label htmlFor="screen_name_input">Name</label>
				<input
					className="block border-2 outline-none w-full p-1 rounded focus:border-rose-500 bg-neutral-100"
					onChange={(e) => {
						setScreenName(e.target.value);
					}}
					id="screen_name_input"
					type="text"
				/>
				<label htmlFor="comment_input">Comment</label>
				<textarea
					onChange={(e) => {
						setComment(e.target.value);
					}}
					id="comment_input"
					className="resize-none block border-2 outline-none w-full p-1 rounded focus:border-rose-500 bg-neutral-100"
					maxLength={500}
					minLength={0}
				/>
				<div className="flex flex-row gap-4 my-2">
					<button
						className="p-2 rounded border-2 hover:border-rose-500 hover:text-rose-600 active:rose-700 active:border-rose-700"
						type="button"
						onClick={() => {
							formRef.current.reset();
							setScreenName("");
							setComment("");
							setCommentFormVisible(false);
						}}
					>
						Cancel
					</button>
					<button
						className="p-2 rounded border-2 hover:border-rose-500 hover:bg-rose-500 hover:text-neutral-100 active:border-rose-700 active:bg-rose-700 active:text-neutral-100"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</dialog>
	);
}
