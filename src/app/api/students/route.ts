import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { studentFormInput, StudentFormInput } from "@/utils/validators/studentInput";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allStudents = await prisma.student.findMany({
            where: {
                userId: String(token.id)
            },
            include: {
                studentCourses: {
                    include: {
                        batch: true,
                        course: true
                    },
                },
            }
        });

        if (!allStudents) {
            return Response.json({ message: "Students not found!!!" }, { status: 404 });
        }


        return Response.json({ message: "Successfully found all students!!!", allStudents }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function POST(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const data: StudentFormInput = await req.json();
        const parsedInput = studentFormInput.safeParse(data);

        if (!parsedInput.success) {
            console.log(parsedInput.error.errors)
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const studentData = await prisma.student.create({
            data: {
                fullName: parsedInput.data.fullName,
                fatherName: parsedInput.data.fatherName,
                motherName: parsedInput.data.motherName,
                dob: new Date(parsedInput.data.dob).toISOString(),
                class: parsedInput.data.class,
                gender: parsedInput.data.gender,
                category: parsedInput.data.category,
                institute: parsedInput.data.institute,
                address: parsedInput.data.address,
                mobileNo: parsedInput.data.mobileNo,
                guardianMobileNo: parsedInput.data.guardianMobileNo,
                userId: String(token.id),
                ...(parsedInput.data.email && { email: parsedInput.data.email }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
                ...(parsedInput.data.photo && { photo: parsedInput.data.photo }),
            }
        });

        return Response.json({ message: "Successfully created the student!!!", studentData }, { status: 201 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};