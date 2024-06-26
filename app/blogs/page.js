import Link from "next/link";

function BlogsPage() {
	return (
		<main className="py-8 px-4">
			<h1 className="font-bold my-2 text-xl">Categories</h1>
			<Link
				href={"/"}
				className="border border-black p-0.5 my-2 block w-fit"
			>
				Main Page
			</Link>
			<ul>
				<li>
					<Link
						className="border border-black p-0.5"
						href={"/blogs/movies"}
					>
						Movies
					</Link>
				</li>
				<li>
					<Link
						className="border border-black p-0.5"
						href={"/blogs/music"}
					>
						Music
					</Link>
				</li>
				<li>
					<Link
						className="border border-black p-0.5"
						href={"/blogs/video-games"}
					>
						Video Games
					</Link>
				</li>
			</ul>
		</main>
	);
}

export default BlogsPage;
