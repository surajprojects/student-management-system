import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { studentDocumentInput, StudentDocumentInput } from "@/utils/validators/studentDocumentInput";

export async function POST(req: NextRequest, { params }: { params: { studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = params;
        const data: StudentDocumentInput = await req.json();
        const parsedInput = studentDocumentInput.safeParse(data);

        if (!parsedInput.success) {
            console.log(parsedInput.error.errors)
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

        const studentDocumentData = await prisma.studentDocument.create({
            data: {
                studentId: foundStudent.id,
                documentType: parsedInput.data.documentType,
                ...(parsedInput.data.documentName && { documentName: parsedInput.data.documentName }),
                institute: parsedInput.data.institute,
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.idNo && { idNo: parsedInput.data.idNo }),
                ...(parsedInput.data.rollNo && { rollNo: parsedInput.data.rollNo }),
                ...(parsedInput.data.enrollmentNo && { enrollmentNo: parsedInput.data.enrollmentNo }),
                ...(parsedInput.data.passingSession && { passingSession: parsedInput.data.passingSession }),
                ...(parsedInput.data.obtainedMarks && { obtainedMarks: parsedInput.data.obtainedMarks }),
                ...(parsedInput.data.totalMarks && { totalMarks: parsedInput.data.totalMarks }),
                ...(parsedInput.data.documentLink && { documentLink: parsedInput.data.documentLink }),
            }
        });

        return Response.json({ message: "Successfully created the student document!!!", studentDocumentData }, { status: 201 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};