import getBlogs from "@/lib/mongoose/crud/getBlogs";
import getBlog from "@/lib/mongoose/crud/getBlog";
import { toWebFormat } from "@/util/blogs/toWebFormat";

export async function generateStaticParams() {
	const blogs = await getBlogs();

	return blogs.map((blog) => ({
		category: blog.categories[0],
		blog: blog.code_name,
	}));
}

export const dynamicParams = false;

async function BlogPage({ params }) {
	const { category, blog } = params;
	const blog_obj = await getBlog(blog);

	return (
		<main>
			<h1>{blog_obj?.title}</h1>
			<p>Primary Category: {toWebFormat(category)}</p>
			<ul>
				{blog_obj?.categories.map((c, index) => {
					return <li key={index}>{c}</li>;
				})}
			</ul>
		</main>
	);
}

export default BlogPage;
