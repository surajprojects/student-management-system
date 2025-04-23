import prisma from "@/db";
import { batchFormInput, BatchFormInput } from "@/utils/validators/batchInput";

export async function GET() {
    try {

        // Dummy Data Only for development 
        // await prisma.batch.createMany({
        //     data: [
        //         { code: 'B01T7AM', name: 'Batch 01 Time 7 AM', time: '7:00 AM' },
        //         { code: 'B02T8AM', name: 'Batch 02 Time 8 AM', time: '8:00 AM' },
        //         { code: 'B03T9AM', name: 'Batch 03 Time 9 AM', time: '9:00 AM' },
        //         { code: 'B04T10AM', name: 'Batch 04 Time 10 AM', time: '10:00 AM' },
        //         { code: 'B05T11AM', name: 'Batch 05 Time 11 AM', time: '11:00 AM' },
        //         { code: 'B06T3PM', name: 'Batch 06 Time 3 PM', time: '3:00 PM' },
        //         { code: 'B07T4PM', name: 'Batch 07 Time 4 PM', time: '4:00 PM' },
        //         { code: 'B08T5PM', name: 'Batch 08 Time 5 PM', time: '5:00 PM' },
        //         { code: 'B09T6PM', name: 'Batch 09 Time 6 PM', time: '6:00 PM' },
        //     ],
        // });

        const allBatches = await prisma.batch.findMany({ include: { students: true } });

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

export async function POST(req: Request) {
    try {
        const data: BatchFormInput = await req.json();
        const parsedInput = batchFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const foundBatch = await prisma.batch.findUnique({ where: { code: parsedInput.data.code } });

        if (foundBatch) {
            return Response.json({ message: "Duplicate batch code!!!" }, { status: 409 });
        }

        const batchData = await prisma.batch.create({
            data: {
                code: parsedInput.data.code,
                name: parsedInput.data.name,
                time: parsedInput.data.time,
            }
        });

        return Response.json({ message: "Successfully created the course!!!", batchData }, { status: 201 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};