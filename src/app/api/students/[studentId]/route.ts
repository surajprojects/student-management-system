import prisma from "@/db";
import { PrismaClientKnownRequestError } from "@/db/generated/prisma/runtime/library";
import { studentFormInputEdit, StudentFormInputEdit } from "@/utils/validators/studentInput";

export async function GET(_req: Request, { params }: { params: { studentId: string } }) {
    try {
        const { studentId } = params;

        const studentData = await prisma.student.findUnique({
            where: { id: studentId },
            include: { batch: true, course: true, payments: true, documents: true }
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

export async function PATCH(req: Request, { params }: { params: { studentId: string } }) {
    try {
        const { studentId } = params;
        const data: StudentFormInputEdit = await req.json();
        const parsedInput = studentFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const foundStudent = await prisma.student.findUnique({ where: { id: studentId } });

        if (!foundStudent) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
        }

        let courseId = undefined;
        let batchId = undefined;

        if (parsedInput.data.course) {
            courseId = await prisma.course.findUnique({
                where: {
                    code: parsedInput.data.course
                }
            });

            if (!courseId) {
                return Response.json({ message: "Invalid course selected!!!" }, { status: 404 });
            }
        }

        if (parsedInput.data.batch) {
            batchId = await prisma.batch.findUnique({
                where: {
                    code: parsedInput.data.batch
                }
            });

            if (!batchId) {
                return Response.json({ message: "Invalid batch selected!!!" }, { status: 404 });
            }
        }

        const studentData = await prisma.student.update({
            where: { id: studentId },
            data: {
                ...(parsedInput.data.fullName && { fullName: parsedInput.data.fullName }),
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
                ...(parsedInput.data.address && { address: parsedInput.data.address }),
                ...(parsedInput.data.category && { category: parsedInput.data.category }),
                ...(parsedInput.data.class && { class: parsedInput.data.class }),
                ...(parsedInput.data.dob && { dob: new Date(parsedInput.data.dob).toISOString() }),
                ...(parsedInput.data.enrolledOn && { enrolledOn: new Date(parsedInput.data.enrolledOn).toISOString() }),
                ...(parsedInput.data.gender && { gender: parsedInput.data.gender }),
                ...(parsedInput.data.mobileNo && { mobileNo: parsedInput.data.mobileNo }),
                ...(parsedInput.data.guardianMobileNo && { guardianMobileNo: parsedInput.data.guardianMobileNo }),
                ...(parsedInput.data.batch && batchId && { batchId: batchId.id }),
                ...(parsedInput.data.course && courseId && { courseId: courseId.id }),
                ...(parsedInput.data.institute && { institute: parsedInput.data.institute }),
                ...(parsedInput.data.totalFees && { totalFees: Number(parsedInput.data.totalFees) }),
                ...(parsedInput.data.email && { email: parsedInput.data.email }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.session && { session: parsedInput.data.session }),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
            }
        });

        return Response.json({ message: "Successfully edited the student!!!", studentData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function DELETE(_req: Request, { params }: { params: { studentId: string } }) {
    try {
        const { studentId } = params;

        await prisma.student.delete({
            where: { id: studentId }
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