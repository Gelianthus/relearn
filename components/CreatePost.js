"use client";

import { useState } from "react";
import Form from "./Form";
import { userStore } from "@/lib/zustand/userStore";

export default function CreatePost() {
	const [popUpVisibile, setPopUpVisible] = useState(false);
	const { user } = userStore();

	return (
		<div className="px-4 py-8">
			<button
				onClick={() => {
					if (user) {
						setPopUpVisible(true);
					} else {
						window.alert("Must be signed in to create Post.");
					}
				}}
				className="hover:border-gray-800 border-2 font-semibold active:border-rose-900 active:bg-rose-900 active:text-neutral-50 border-neutral-50 px-1 py-0.5 rounded"
			>
				Create Post{" "}
				<span className="material-symbols-outlined align-bottom google-icon-wght-300">
					add
				</span>
			</button>
			<Form
				popUpVisibile={popUpVisibile}
				setPopUpVisible={setPopUpVisible}
			/>
		</div>
	);
}
