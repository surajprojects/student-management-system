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
            where: {
                userId: String(token.id),
            },
            include: {
                studentCourses: {
                    include: {
                        payments: true,
                    }
                }
            },
        });

        if (!allStudents) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
        }

        let studentsFeesDue = 0;

        const studentsData = allStudents.map((student) => {
            return {
                totalFees: student.studentCourses.reduce((sum, fees) => sum + fees.totalFees, 0),
                paidFees: student.studentCourses.reduce((sum, payment) => sum + payment.payments.reduce((sum, fees) => sum + fees.amount, 0), 0),
            }
        });

        for (let i = 0; i < studentsData.length; i++) {
            if (studentsData[i].totalFees > studentsData[i].paidFees) {
                studentsFeesDue += 1;
            }
        };

        const dashboardData = {
            totalStudentsFeesDue: studentsFeesDue,
            totalStudents: allStudents.length,
            totalFeesPaid: studentsData.reduce((sum, payment) => sum + payment.paidFees, 0),
            totalFees: studentsData.reduce((sum, payment) => sum + payment.totalFees, 0),
        };

        return Response.json({ message: "Successfully found all students!!!", dashboardData }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};