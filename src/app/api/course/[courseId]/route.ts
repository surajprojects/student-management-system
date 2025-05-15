import prisma from "@/db";

import { NextRequest } from "next/server";
import { PrismaClientKnownRequestError } from "@/db/generated/prisma/runtime/library";
import { courseFormInputEdit, CourseFormInputEdit } from "@/utils/validators/courseInput";
import { verifyUser } from "@/lib/apiAuth";

export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { courseId } = params;

        const courseData = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId: String(token.id),
            },
            include: { students: true }
        });

        if (!courseData) {
            return Response.json({ message: "Course not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the course!!!", courseData }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: NextRequest, { params }: { params: { courseId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { courseId } = params;
        const data: CourseFormInputEdit = await req.json();
        const parsedInput = courseFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const courseData = await prisma.course.update({
            where: { id: courseId, userId: String(token.id), },
            data: {
                ...(parsedInput.data.code && { code: parsedInput.data.code }),
                ...(parsedInput.data.name && { name: parsedInput.data.name }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.duration && { duration: parsedInput.data.duration }),
                ...(parsedInput.data.fees && { fees: parsedInput.data.fees }),
            }
        });

        return Response.json({ message: "Successfully updated the course!!!", courseData }, { status: 200 });
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

export async function DELETE(req: NextRequest, { params }: { params: { courseId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { courseId } = params;

        await prisma.course.delete({
            where: { id: courseId, userId: String(token.id), }
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