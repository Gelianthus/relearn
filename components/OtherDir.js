import Link from "next/link";

export default function OtherDir({ hrefDir, dirName }) {
	return (
		<Link
			className="p-0.5 border border-black"
			href={hrefDir}
		>
			{dirName}
		</Link>
	);
}
