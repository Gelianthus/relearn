import OtherDir from "@/components/OtherDir";

export default function Home() {
	return (
		<main className="py-8 px-4">
			<h1 className="font-bold my-2 text-xl">Main Page</h1>
			<nav>
				<ul>
					<li>
						<OtherDir
							hrefDir={"/blogs"}
							dirName={"Blogs"}
						/>
						<OtherDir
							hrefDir={"/open-forum"}
							dirName={"Open Forum"}
						/>
					</li>
				</ul>
			</nav>
		</main>
	);
}
