import { DocumentType, Institute } from "@/db/generated/prisma";
import z from "zod";

export const studentDocumentInput = z.object({
    documentType: z.enum([...Object.values(DocumentType)] as [DocumentType, ...DocumentType[]]),
    documentName: z.string().optional(),
    institute: z.enum([...Object.values(Institute)] as [Institute, ...Institute[]]),
    instituteName: z.string().optional(),
    idNo: z.string().optional(),
    rollNo: z.string().optional(),
    enrollmentNo: z.string().optional(),
    passingSession: z.string().optional(),
    obtainedMarks: z.number().optional(),
    totalMarks: z.number().optional(),
    documentLink: z.string().optional(),
}).strict();

export type StudentDocumentInput = z.infer<typeof studentDocumentInput>;

export const studentDocumentInputEdit = studentDocumentInput.partial().strict();

export type StudentDocumentInputEdit = z.infer<typeof studentDocumentInputEdit>;