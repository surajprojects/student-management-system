import { FeesStatus, Status } from "@/db/generated/prisma";
import z from "zod";

export const studentCourseInput = z.object({
    batchCode: z.string(),
    courseCode: z.string(),
    enrolledOn: z.string().date(),
    totalFees: z.string(),
    session: z.string(),
    remarks: z.string().optional(),
}).strict();

export type StudentCourseInput = z.infer<typeof studentCourseInput>;

export const studentCourseInputEdit = z.object({
    batchCode: z.string().optional(),
    courseCode: z.string().optional(),
    enrolledOn: z.string().date().optional(),
    totalFees: z.string().optional(),
    session: z.string().optional(),
    remarks: z.string().optional(),
    status: z.enum([...Object.values(Status)] as [Status, ...Status[]]).optional(),
    feesStatus: z.enum([...Object.values(FeesStatus)] as [FeesStatus, ...FeesStatus[]]).optional(),
}).strict();

export type StudentCourseInputEdit = z.infer<typeof studentCourseInputEdit>;