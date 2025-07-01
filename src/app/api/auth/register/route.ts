import prisma from "@/db";
import bcrypt from "bcryptjs";
import { userFormInput, UserFormInput } from "@/utils/validators/userInput";

export async function POST(req: Request) {
    try {
        const data: UserFormInput = await req.json();
        const parsedInput = userFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const hashedPassword = bcrypt.hashSync(parsedInput.data.password, 10);

        await prisma.user.create({
            data: {
                username: parsedInput.data.username,
                password: hashedPassword,
                email: parsedInput.data.email,
                mobileNo: parsedInput.data.mobileNo,
                name: parsedInput.data.name,
                fatherName: parsedInput.data.fatherName,
                motherName: parsedInput.data.motherName,
                dob: new Date(parsedInput.data.dob).toISOString(),
                address: parsedInput.data.address,
                gender: parsedInput.data.gender,
                category: parsedInput.data.category,
                instituteName: parsedInput.data.instituteName,
                instituteAddress: parsedInput.data.instituteAddress,
                contactNoPrimary: parsedInput.data.contactNoPrimary,
                contactNoSecondary: parsedInput.data.contactNoSecondary,
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
            }
        });

        return Response.json({ message: "Successfully created the user!!!" }, { status: 201 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};