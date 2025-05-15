import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { courseFormInput, CourseFormInput } from "@/utils/validators/courseInput";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allCourses = await prisma.course.findMany({
            where: { userId: String(token.id) },
            include: { students: true }
        });

        if (!allCourses) {
            return Response.json({ message: "Course not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all courses!!!", allCourses }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function POST(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const data: CourseFormInput = await req.json();
        const parsedInput = courseFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const foundCourse = await prisma.course.findUnique({
            where: {
                code: parsedInput.data.code,
                userId: String(token.id),
            }
        });

        if (foundCourse) {
            return Response.json({ message: "Duplicate course code!!!" }, { status: 409 });
        }

        const courseData = await prisma.course.create({
            data: {
                code: parsedInput.data.code,
                name: parsedInput.data.name,
                instituteName: parsedInput.data.instituteName,
                duration: parsedInput.data.duration,
                fees: parsedInput.data.fees,
                userId: String(token.id),
            }
        });

        return Response.json({ message: "Successfully created the course!!!", courseData }, { status: 201 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};