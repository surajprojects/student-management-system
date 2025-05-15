import prisma from "@/db";
import { userFormInput, UserFormInput } from "@/utils/validators/userInput";

export async function POST(req: Request) {
    try {
        const data: UserFormInput = await req.json();
        const parsedInput = userFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const userData = await prisma.user.create({
            data: {
                username: parsedInput.data.username,
                password: parsedInput.data.password,
                email: parsedInput.data.email,
                mobileNo: parsedInput.data.mobileNo,
                category: parsedInput.data.category,
                gender: parsedInput.data.gender,
                name: parsedInput.data.name,
                fatherName: parsedInput.data.fatherName,
                motherName: parsedInput.data.motherName,
                address: parsedInput.data.address,
                dob: new Date(parsedInput.data.dob).toISOString(),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
                ...(parsedInput.data.photo && { photo: parsedInput.data.photo }),
            }
        });

        return Response.json({ message: "Successfully created the user!!!", userData }, { status: 201 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};