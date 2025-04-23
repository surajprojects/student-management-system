import prisma from "@/db";

import { PrismaClientKnownRequestError } from "@/db/generated/prisma/runtime/library";
import { courseFormInputEdit, CourseFormInputEdit } from "@/utils/validators/courseInput";

export async function GET(_req: Request, { params }: { params: { courseId: string } }) {
    try {
        const { courseId } = params;

        const courseData = await prisma.course.findUnique({
            where: { id: courseId },
            include: { students: true }
        });

        if (!courseData) {
            return Response.json({ message: "Courses not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the course!!!", courseData }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
    try {
        const { courseId } = params;
        const data: CourseFormInputEdit = await req.json();
        const parsedInput = courseFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const courseData = await prisma.course.update({
            where: { id: courseId },
            data: {
                ...(parsedInput.data.code && { code: parsedInput.data.code }),
                ...(parsedInput.data.name && { name: parsedInput.data.name }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.duration && { duration: parsedInput.data.duration }),
                ...(parsedInput.data.fees && { fees: parsedInput.data.fees }),
            }
        });

        return Response.json({ message: "Successfully edited the course!!!", courseData }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return Response.json({ message: "Course not found!!!" }, { status: 404 });
        }
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function DELETE(_req: Request, { params }: { params: { courseId: string } }) {
    try {
        const { courseId } = params;

        await prisma.course.delete({
            where: { id: courseId }
        });

        return Response.json({ message: "Successfully deleted the course!!!" }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return Response.json({ message: "Course not found!!!" }, { status: 404 });
        }
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};