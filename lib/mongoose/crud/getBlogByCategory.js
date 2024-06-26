import mongoConnection from "../mongoConnection";
import Blog from "../blogs/models/Blog";

async function getBlogsByCategory(category) {
	await mongoConnection();
	try {
		const blogsByCategory = await Blog.find({ categories: category });
		return blogsByCategory;
	} catch (error) {
		console.error(error.message);
	}
}

export default getBlogsByCategory;
