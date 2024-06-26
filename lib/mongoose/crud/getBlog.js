import mongoConnection from "../mongoConnection";
import Blog from "../blogs/models/Blog";

async function getBlog(blog_title) {
	await mongoConnection();

	try {
		const blog_obj = await Blog.findOne({ code_name: blog_title });
		return blog_obj;
	} catch (error) {
		console.error(error.message);
	}
}

export default getBlog;
