import SignIn from "@/components/SignIn";
import Link from "next/link";

export default function OpenForumLayout({ children }) {
	return (
		<main className="flex-grow bg-neutral-50">
			<div className="p-4 bg-rose-950 flex flex-row justify-between items-center">
				<div>
					<h1 className="text-5xl text-red-700 my-2">
						<Link href={"/open-forum"}>Open Forum</Link>
					</h1>
					<p className="text-neutral-50 font-medium">
						Publish articles anonymously
					</p>
				</div>
				<div>
					<SignIn />
				</div>
			</div>
			{children}
		</main>
	);
}
