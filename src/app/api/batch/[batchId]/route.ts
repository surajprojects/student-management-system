import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import { PrismaClientKnownRequestError } from "@/db/generated/prisma/runtime/library";
import { BatchFormInputEdit, batchFormInputEdit } from "@/utils/validators/batchInput";

export async function GET(req: NextRequest, { params }: { params: { batchId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { batchId } = params;

        const batchData = await prisma.batch.findUnique({
            where: {
                id: batchId,
                userId: String(token.id),
            },
            include: { students: true }
        });

        if (!batchData) {
            return Response.json({ message: "Batch not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the batch!!!", batchData }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function PATCH(req: NextRequest, { params }: { params: { batchId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { batchId } = params;
        const data: BatchFormInputEdit = await req.json();
        const parsedInput = batchFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const batchData = await prisma.batch.update({
            where: {
                id: batchId,
                userId: String(token.id),
            },
            data: {
                ...(parsedInput.data.code && { code: parsedInput.data.code }),
                ...(parsedInput.data.name && { name: parsedInput.data.name }),
                ...(parsedInput.data.time && { time: parsedInput.data.time }),
            }
        });

        return Response.json({ message: "Successfully updated the batch!!!", batchData }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return Response.json({ message: "Batch not found!!!" }, { status: 404 });
        }
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function DELETE(req: NextRequest, { params }: { params: { batchId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { batchId } = params;

        await prisma.batch.delete({
            where: {
                id: batchId,
                userId: String(token.id),
            }
        });

        return Response.json({ message: "Successfully deleted the batch!!!" }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return Response.json({ message: "Batch not found!!!" }, { status: 404 });
        }
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};