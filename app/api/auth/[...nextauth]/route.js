// Import necessary modules and models
import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: "265360331645-t82a0eg4ln9ohbdf0adeko9b6sifnk28.apps.googleusercontent.com",
            clientSecret: "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",
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                // Connect to the database
                await connectToDB();
                // Find the user in the database based on the email in the session
                const sessionUser = await User.findOne({
                    email: session.user.email
                });
                // If the user exists, set the user ID in the session
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
            } catch (error) {
                console.error('Error fetching session user:', error);
            }
            // Return the updated session
            return session;
        },
        async signIn({ profile, account, isNewUser }) {
            try {
                // Connect to the database
                await connectToDB();
                // Find the user in the database based on the email in the profile
                const userExists = await User.findOne({
                    email: profile.email
                });

                console.log("user exists", userExists);

                // If the user does not exist, create a new user in the database
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }

                // Return true to indicate a successful sign-in
                return true;
            } catch (error) {
                // Log the error if there's an issue during sign-in
                console.error('Error during sign-in:', error);
                // Return false to indicate a failed sign-in
                return false;
            }
        }
    }
});

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };

