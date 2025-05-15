import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { PaymentFormInput, paymentFormInput } from "@/utils/validators/paymentInput";

export async function POST(req: NextRequest, { params }: { params: { studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = params;
        const data: PaymentFormInput = await req.json();
        const parsedInput = paymentFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const foundStudent = await prisma.student.findUnique({ where: { id: studentId, userId: String(token.id), } });

        if (!foundStudent) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
        }

        const paymentData = await prisma.payment.create({
            data: {
                studentId: foundStudent.id,
                amount: parsedInput.data.amount,
                date: new Date(parsedInput.data.date).toISOString(),
                method: parsedInput.data.method,
            }
        });

        return Response.json({ message: "Successfully saved the payment!!!", paymentData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};