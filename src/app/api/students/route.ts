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
                course: true,
                batch: true
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
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const courseId = await prisma.course.findUnique({
            where: {
                code: parsedInput.data.course,
                userId: String(token.id),
            }
        });

        if (!courseId) {
            return Response.json({ message: "Invalid course selected!!!" }, { status: 404 });
        }

        const batchId = await prisma.batch.findUnique({
            where: {
                code: parsedInput.data.batch,
                userId: String(token.id),
            }
        });

        if (!batchId) {
            return Response.json({ message: "Invalid batch selected!!!" }, { status: 404 });
        }

        const studentData = await prisma.student.create({
            data: {
                fullName: parsedInput.data.fullName,
                fatherName: parsedInput.data.fatherName,
                motherName: parsedInput.data.motherName,
                address: parsedInput.data.address,
                category: parsedInput.data.category,
                class: parsedInput.data.class,
                dob: new Date(parsedInput.data.dob).toISOString(),
                enrolledOn: new Date(parsedInput.data.enrolledOn).toISOString(),
                gender: parsedInput.data.gender,
                mobileNo: parsedInput.data.mobileNo,
                guardianMobileNo: parsedInput.data.guardianMobileNo,
                batchId: batchId.id,
                courseId: courseId.id,
                institute: parsedInput.data.institute,
                totalFees: Number(parsedInput.data.totalFees),
                session: parsedInput.data.session,
                userId: String(token.id),
                ...(parsedInput.data.email && { email: parsedInput.data.email }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
            },
            include: { batch: true, course: true }
        });

        return Response.json({ message: "Successfully created the student!!!", studentData }, { status: 201 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};