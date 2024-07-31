import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from './db';
import bcrypt from 'bcryptjs';

export const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return {
                        code: 401,
                        message: "Email and Password are required"
                    }
                }

                const exisitingUser = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!exisitingUser) {
                    return {
                        code: 401,
                        message: "User not found",
                    };
                }

                if (exisitingUser.password) {
                    const passwordMatch = await bcrypt.compare(credentials.password, exisitingUser.password);
                    if (!passwordMatch) {
                        return {
                            code: 401,
                            message: "Invalid Password",
                        }
                    }
                }
                
                // console.log(exisitingUser);
                return {
                    id: exisitingUser.id,
                    username: exisitingUser.username,
                    email: exisitingUser.email,
                    code: 200,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser}) {
            if(user) {
                return {
                    ...token,
                    username: user.username,
                }
            }
            return token;
        },
        async session({ session, user, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                }
            }
        },
    }
};