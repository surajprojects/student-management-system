import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (req.method !== "POST") return null;

                const userData = await prisma.user.findUnique({
                    where: { username: credentials?.username || "" },
                });

                if (!userData) return null;

                const passwordCheck = await bcrypt.compare(
                    credentials?.password || "",
                    userData.password
                );

                if (!passwordCheck) return null;

                return {
                    id: userData.id,
                    username: userData.username,
                    name: userData.name,
                    email: userData.email,
                };
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export async function getSessionOrRedirect() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/")
    }

    return session;
};