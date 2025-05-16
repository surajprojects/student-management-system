import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allStudents = await prisma.student.findMany({
            where: { userId: String(token.id) },
            include: { payments: true, course: true }
        });

        console.log(allStudents)

        if (!allStudents) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
        }

        const studentsData = allStudents.map((student) => {
            return {
                id: student.id,
                fullName: student.fullName,
                fatherName: student.fatherName,
                course: student.course.name,
                session: student.session,
                totalFees: student.totalFees,
                paidFees: student.payments.reduce((sum, payment) => sum + payment.amount, 0),
            }
        });

        return Response.json({ message: "Successfully found all students!!!", studentsData }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};