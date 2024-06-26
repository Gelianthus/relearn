"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { userStore } from "@/lib/zustand/userStore";
import Image from "next/image";

export default function SignIn() {
	const { user, setUser, getUser } = userStore();
	const { data: session } = useSession();

	useEffect(() => {
		session?.user && getUser(session?.user.email);
	}, [session]);

	return (
		<>
			{user ? (
				<div className="flex flex-row items-center gap-4">
					<button
						onClick={() => {
							signOut({ callbackUrl: "/open-forum" });
							setUser(null);
						}}
						className="text-neutral-50"
					>
						Sign Out{" "}
						<span className="material-symbols-outlined align-bottom">
							logout
						</span>
					</button>
					<Image
						className="rounded-full block"
						src={user?.profile_picture.img_src}
						alt={user?.profile_picture.img_alt}
						width={32}
						height={32}
					/>
				</div>
			) : (
				<button
					onClick={() => signIn("google")}
					className="text-neutral-50"
				>
					Sign In{" "}
					<span className="material-symbols-outlined align-bottom">login</span>
				</button>
			)}
		</>
	);
}
