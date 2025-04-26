import { PaymentMode } from "@/db/generated/prisma";
import z from "zod";

export const paymentFormInput = z.object({
    amount: z.number(),
    method: z.enum([...Object.values(PaymentMode)] as [PaymentMode, ...PaymentMode[]]),
    date: z.string(),
}).strict();

export type PaymentFormInput = z.infer<typeof paymentFormInput>;