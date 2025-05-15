import prisma from "@/db";
import { verifyUser } from "@/lib/apiAuth";
import { batchFormInput, BatchFormInput } from "@/utils/validators/batchInput";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allBatches = await prisma.batch.findMany({
            where: { userId: String(token.id) },
            include: { students: true }
        });

        if (!allBatches) {
            return Response.json({ message: "Batch not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all batches!!!", allBatches }, { status: 200 });
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

        const data: BatchFormInput = await req.json();
        const parsedInput = batchFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const foundBatch = await prisma.batch.findUnique({
            where: {
                userId: String(token.id),
                code: parsedInput.data.code
            }
        });

        if (foundBatch) {
            return Response.json({ message: "Duplicate batch code!!!" }, { status: 409 });
        }

        const batchData = await prisma.batch.create({
            data: {
                code: parsedInput.data.code,
                name: parsedInput.data.name,
                time: parsedInput.data.time,
                userId: String(token.id),
            }
        });

        return Response.json({ message: "Successfully created the batch!!!", batchData }, { status: 201 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};