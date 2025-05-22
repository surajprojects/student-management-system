import prisma from "@/db";
import { z } from "zod";

interface contactFormType {
    name: string,
    email: string,
    message: string,
}

export const contactInput = z.object({
    name: z.string(),
    email: z.string(),
    message: z.string(),
});

export async function POST(req: Request) {
    try {
        const data: contactFormType = await req.json();
        const parsedInput = contactInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: parsedInput.error }, { status: 411 });
        }

        const { name, email, message } = parsedInput.data;

        await prisma.contact.create({
            data: {
                name,
                email,
                message
            }
        });

        return Response.json({ message: "Successfully stored the data!" }, { status: 201 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};