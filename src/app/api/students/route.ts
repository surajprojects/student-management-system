import prisma from "@/db";
import { studentFormInput, StudentFormInput } from "@/utils/validators/studentInput";

export async function GET() {
    try {
        const allStudents = await prisma.student.findMany({ include: { course: true, batch: true } });

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

export async function POST(req: Request) {
    try {
        const data: StudentFormInput = await req.json();
        const parsedInput = studentFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const courseId = await prisma.course.findUnique({
            where: {
                code: parsedInput.data.course,
            }
        });

        if (!courseId) {
            return Response.json({ message: "Invalid course selected!!!" }, { status: 404 });
        }

        const batchId = await prisma.batch.findUnique({
            where: { code: parsedInput.data.batch }
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