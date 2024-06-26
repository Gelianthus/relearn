import mongoConnection from "../mongoConnection";
import Blog from "../blogs/models/Blog";

async function getBlogs() {
	await mongoConnection();
	try {
		return await Blog.find({});
	} catch (error) {
		console.error(error.message);
	}
}

export default getBlogs;
