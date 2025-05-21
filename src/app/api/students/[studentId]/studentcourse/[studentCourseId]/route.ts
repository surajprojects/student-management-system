import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { studentCourseInputEdit, StudentCourseInputEdit } from "@/utils/validators/studentCourseInput";

export async function GET(req: NextRequest, { params }: { params: { studentCourseId: string, studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId, studentCourseId } = params;

        const studentCourseData = await prisma.studentCourse.findUnique({
            where: {
                id: studentCourseId,
                studentId: studentId,
            },
            include: {
                batch: true,
                course: true,
                payments: true,
            }
        });

        if (!studentCourseData) {
            return Response.json({ message: "Student course not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found student course!!!", studentCourseData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: NextRequest, { params }: { params: { studentCourseId: string, studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentCourseId, studentId } = params;
        const data: StudentCourseInputEdit = await req.json();
        const parsedInput = studentCourseInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const foundStudentCourse = await prisma.studentCourse.findUnique({
            where: {
                id: studentCourseId,
                studentId: studentId,
            }
        });

        if (!foundStudentCourse) {
            return Response.json({ message: "Student course not found!!!" }, { status: 404 });
        }

        const foundBatch = await prisma.batch.findUnique({
            where: {
                code: parsedInput.data.batchCode,
                userId: String(token.id),
            }
        });

        if (!foundBatch) {
            return Response.json({ message: "Batch not found!!!" }, { status: 404 });
        }

        const foundCourse = await prisma.course.findUnique({
            where: {
                code: parsedInput.data.courseCode,
                userId: String(token.id),
            }
        });

        if (!foundCourse) {
            return Response.json({ message: "Course not found!!!" }, { status: 404 });
        }

        const studentCourseData = await prisma.studentCourse.update({
            where: { id: studentCourseId },
            data: {
                ...(parsedInput.data.batchCode && { batchId: foundBatch.id }),
                ...(parsedInput.data.courseCode && { courseId: foundCourse.id }),
                ...(parsedInput.data.totalFees && { totalFees: Number(parsedInput.data.totalFees) }),
                ...(parsedInput.data.status && { status: parsedInput.data.status }),
                ...(parsedInput.data.feesStatus && { feesStatus: parsedInput.data.feesStatus }),
                ...(parsedInput.data.enrolledOn && { enrolledOn: new Date(parsedInput.data.enrolledOn).toISOString() }),
                ...(parsedInput.data.session && { session: parsedInput.data.session }),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
            }
        });

        return Response.json({ message: "Successfully updated the student course!!!", studentCourseData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function DELETE(req: NextRequest, { params }: { params: { studentId: string, studentCourseId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId, studentCourseId } = params;

        await prisma.studentCourse.delete({
            where: { id: studentCourseId, studentId: studentId, }
        });

        return Response.json({ message: "Successfully deleted the student course!!!" }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return Response.json({ message: "Payment details not found!!!" }, { status: 404 });
        }
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};