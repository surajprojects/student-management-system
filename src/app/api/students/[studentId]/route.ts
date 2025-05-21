import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { PrismaClientKnownRequestError } from "@/db/generated/prisma/runtime/library";
import { studentFormInputEdit, StudentFormInputEdit } from "@/utils/validators/studentInput";

export async function GET(req: NextRequest, { params }: { params: { studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = params;

        const studentData = await prisma.student.findUnique({
            where: {
                id: studentId,
                userId: String(token.id),
            },
            include: {
                studentCourses: {
                    include: {
                        batch: true,
                        course: true,
                        payments: true,
                    },
                },
                documents: true,
            }
        });

        if (!studentData) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the student!!!", studentData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: NextRequest, { params }: { params: { studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = params;
        const data: StudentFormInputEdit = await req.json();
        const parsedInput = studentFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const foundStudent = await prisma.student.findUnique({ where: { id: studentId, userId: String(token.id), } });

        if (!foundStudent) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
        }

        const studentData = await prisma.student.update({
            where: { id: studentId, userId: String(token.id), },
            data: {
                ...(parsedInput.data.fullName && { fullName: parsedInput.data.fullName }),
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
                ...(parsedInput.data.dob && { dob: new Date(parsedInput.data.dob).toISOString() }),
                ...(parsedInput.data.class && { class: parsedInput.data.class }),
                ...(parsedInput.data.gender && { gender: parsedInput.data.gender }),
                ...(parsedInput.data.category && { category: parsedInput.data.category }),
                ...(parsedInput.data.institute && { institute: parsedInput.data.institute }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.mobileNo && { mobileNo: parsedInput.data.mobileNo }),
                ...(parsedInput.data.guardianMobileNo && { guardianMobileNo: parsedInput.data.guardianMobileNo }),
                ...(parsedInput.data.address && { address: parsedInput.data.address }),
                ...(parsedInput.data.email && { email: parsedInput.data.email }),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
                ...(parsedInput.data.photo && { photo: parsedInput.data.photo }),
            }
        });

        return Response.json({ message: "Successfully updated the student!!!", studentData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function DELETE(req: NextRequest, { params }: { params: { studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = params;

        await prisma.student.delete({
            where: { id: studentId, userId: String(token.id), }
        });

        return Response.json({ message: "Successfully deleted the student!!!" }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
        }
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};