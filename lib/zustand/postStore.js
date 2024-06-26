import { create } from "zustand";

export const postStore = create((set) => ({
	posts: [],
	setPosts: (newPosts) => set({ posts: newPosts }),
	getPosts: async () => {
		try {
			const res = await fetch(`/api/open-forum`, {
				method: "GET",
				cache: "no-store",
			});

			if (res.ok) {
				const data = await res.json();
				set(() => ({ posts: data.posts }));
			}
		} catch (error) {
			console.log(error.message);
		}
	},
}));
