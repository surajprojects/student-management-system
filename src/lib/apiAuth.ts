import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";


export async function verifyUser(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return null;
    }

    return token;
};