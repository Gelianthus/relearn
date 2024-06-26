"use client";

import { useRef, useEffect, useState } from "react";
import { userStore } from "@/lib/zustand/userStore";
import { postStore } from "@/lib/zustand/postStore";

export default function Form({ popUpVisibile, setPopUpVisible }) {
	const popUpRef = useRef(null);
	const formRef = useRef(null);
	const { user } = userStore();
	const { setPosts } = postStore();

	const [screenName, setScreenName] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		if (popUpVisibile === true) {
			popUpRef.current.showModal();
		} else {
			popUpRef.current.close();
		}
	}, [popUpVisibile]);

	const submitForm = async () => {
		const res = await fetch(`/api/open-forum`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				user_id: user?._id,
				screen_name: screenName,
				title,
				content,
			}),
		});

		if (res.ok) {
			const data = await res.json();
			setScreenName("");
			setTitle("");
			setContent("");
			formRef.current.reset();
			setPopUpVisible(false);
			setPosts(data.posts);
			window.alert(data.message);
		} else {
			const data = await res.json();
			setScreenName("");
			setTitle("");
			setContent("");
			formRef.current.reset();
			setPopUpVisible(false);
			window.alert(data.message);
		}
	};

	return (
		<dialog
			ref={popUpRef}
			className={`p-8 rounded`}
		>
			<form
				ref={formRef}
				className="rounded"
				onSubmit={(e) => {
					e.preventDefault();
					submitForm();
				}}
			>
				<label
					className="font-semibold"
					htmlFor="input_author"
				>
					Author
				</label>
				<input
					onChange={(e) => {
						setScreenName(e.target.value);
					}}
					className="block p-1 my-2 outline-none border-2 focus:border-rose-500 rounded w-full bg-neutral-100"
					name="author"
					id="input_author"
					maxLength={30}
				/>
				<label className="font-semibold">Title</label>
				<input
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					className="block p-1 my-2 outline-none border-2 focus:border-rose-500 rounded w-full bg-neutral-100"
					name="title"
					type="text"
					required
					maxLength={50}
					minLength={1}
				/>
				<label
					className="font-semibold"
					htmlFor="input_content"
				>
					Content
				</label>
				<textarea
					onChange={(e) => {
						setContent(e.target.value);
					}}
					name="content"
					id="input_content"
					required
					minLength={1}
					maxLength={2000}
					className="resize-none block p-1 my-2 w-[40rem] h-64 border-2 outline-none focus:border-rose-500 rounded bg-neutral-100"
				/>
				<div className="flex flex-row gap-4 mt-6 font-medium justify-end">
					<button
						className="py-1 px-2 hover:text-rose-700 active:text-rose-900"
						type="button"
						onClick={() => {
							setScreenName("");
							setTitle("");
							setContent("");
							setPopUpVisible(false);
						}}
					>
						Cancel
					</button>
					<button
						className="py-1 px-2 bg-rose-700 hover:bg-rose-800 active:bg-rose-900 rounded text-neutral-100"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</dialog>
	);
}
