import Image from "next/image";
import Link from "next/link";

export default function Post({ post }) {
	return (
		<Link
			href={`/open-forum/${post?._id}`}
			className="my-8 border-2 py-2 rounded block hover:bg-neutral-100 hover:border-rose-300"
		>
			<div className="flex flex-row gap-4 mb-2 items-center px-2">
				<Image
					src={"/images/blogs/category-icons/artist-icon.webp"}
					alt="Default image for users"
					width={32}
					height={32}
					className="rounded-full border border-rose-500"
				/>
				<span className="font-medium">{post?.screen_name}</span>
			</div>
			<div className="block ">
				<h2 className="px-2 mb-2 font-semibold">{post?.title}</h2>
				<p className="px-2">
					{post?.content.length > 399
						? post?.content.slice(0, 400) + "..."
						: post?.content}
				</p>
			</div>
			<div className="mt-4 flex flex-row gap-4 justify-between items-center px-2">
				<div className="flex flex-row gap-4 items-center">
					<div className="inline-block w-fit text-sm">
						<span>
							<span className="material-symbols-outlined align-bottom google-icon-wght-300 google-icon-size-20 text-neutral-700">
								thumb_up
							</span>
						</span>
						<span className="ml-1">
							{post?.upvote.length - post?.downvote.length}
						</span>
						<span className="ml-1">
							<span className="material-symbols-outlined align-bottom google-icon-wght-300 google-icon-size-20 text-neutral-700">
								thumb_down
							</span>
						</span>
					</div>
				</div>
				<span className="text-xs text-neutral-700">{post?.createdAt}</span>
			</div>
		</Link>
	);
}
