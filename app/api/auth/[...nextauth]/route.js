import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/mongoose/models/User";
import mongoConnection from "@/lib/mongoose/mongoConnection";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	session: {
		autoSignIn: false,
		maxAge: 60 * 60,
	},
	callbacks: {
		async signIn({ user }) {
			await mongoConnection();
			try {
				const userExist = await User.findOne({
					email: user.email,
				});

				if (!userExist) {
					const userCreated = await User.create({
						name: user.name,
						email: user.email,
						profile_picture: {
							img_src: user.image,
							img_alt: `Profile picture of ${user.name}`,
						},
					});
					if (!userCreated) {
						return false;
					}
				}
				return true;
			} catch (error) {
				console.error(error.message);
				return false;
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
