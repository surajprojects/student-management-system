import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { studentCourseInput, StudentCourseInput } from "@/utils/validators/studentCourseInput";

export async function POST(req: NextRequest, { params }: { params: { studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = params;
        const data: StudentCourseInput = await req.json();
        const parsedInput = studentCourseInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const foundStudent = await prisma.student.findUnique({
            where: {
                id: studentId,
                userId: String(token.id),
            }
        });

        if (!foundStudent) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
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

        const studentCourseData = await prisma.studentCourse.create({
            data: {
                studentId: foundStudent.id,
                batchId: foundBatch.id,
                courseId: foundCourse.id,
                totalFees: Number(parsedInput.data.totalFees),
                enrolledOn: new Date(parsedInput.data.enrolledOn).toISOString(),
                session: parsedInput.data.session,
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),

            }
        });

        return Response.json({ message: "Successfully created the student course!!!", studentCourseData }, { status: 201 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};