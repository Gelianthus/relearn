import getBlogs from "@/lib/mongoose/crud/getBlogs";
import getBlogsByCategory from "@/lib/mongoose/crud/getBlogByCategory";
import Link from "next/link";

export async function generateStaticParams() {
	const blogs = await getBlogs();

	return blogs.map((blog) => ({
		category: blog.categories[0],
	}));
}

export const dynamicParams = false;

async function BlogCategoryPage({ params }) {
	const { category } = params;
	const blogs = await getBlogsByCategory(category);
	return (
		<main>
			<h1>{category}</h1>
			<ul>
				{blogs.map((blog) => {
					return (
						<li key={blog?._id}>
							<Link href={`/blogs/${blog?.categories[0]}/${blog?.code_name}`}>
								{blog?.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</main>
	);
}

export default BlogCategoryPage;
