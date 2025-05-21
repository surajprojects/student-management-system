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
            include: {
                studentCourses: {
                    include: {
                        batch: true,
                        course: true,
                        payments: true,
                    }
                }
            },
        });

        if (!allStudents) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
        }

        const studentsData = allStudents.map((student) => {
            return {
                id: student.id,
                fullName: student.fullName,
                fatherName: student.fatherName,
                totalFees: student.studentCourses.reduce((sum, fees) => sum + fees.totalFees, 0),
                paidFees: student.studentCourses.reduce((sum, payment) => sum + payment.payments.reduce((sum, fees) => sum + fees.amount, 0), 0),
                status: student.studentCourses.map((status) => {
                    if (status.feesStatus !== "PAID") {
                        return { feesStatus: status.feesStatus, status: status.status };
                    }
                }),
            }
        });

        return Response.json({ message: "Successfully found all students!!!", studentsData }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};