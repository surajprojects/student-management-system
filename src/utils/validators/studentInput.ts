import z from "zod";
import { Category, Gender, Institute } from "@/db/generated/prisma";

export const studentFormInput = z.object({
    fullName: z.string(),
    fatherName: z.string(),
    motherName: z.string(),
    dob: z.string().date(),
    class: z.string(),
    institute: z.enum([...Object.values(Institute)] as [Institute, ...Institute[]]),
    instituteName: z.string().optional(),
    gender: z.enum([...Object.values(Gender)] as [Gender, ...Gender[]]),
    category: z.enum([...Object.values(Category)] as [Category, ...Category[]]),
    mobileNo: z.string().regex(/^\d{10}$/, "Mobile No. must be 10 digits number string. Example - '1234567890'"),
    guardianMobileNo: z.string().regex(/^\d{10}$/, "Guardian mobile No. must be 10 digits number string. Example - '1234567890'"),
    address: z.string(),
    email: z.string().email().optional(),
    remarks: z.string().optional(),
    photo: z.string().optional(),
}).strict();

export type StudentFormInput = z.infer<typeof studentFormInput>;

export const studentFormInputEdit = z.object({
    fullName: z.string().optional(),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    dob: z.string().date().optional(),
    class: z.string().optional(),
    institute: z.enum([...Object.values(Institute)] as [Institute, ...Institute[]]).optional(),
    instituteName: z.string().optional(),
    gender: z.enum([...Object.values(Gender)] as [Gender, ...Gender[]]).optional(),
    category: z.enum([...Object.values(Category)] as [Category, ...Category[]]).optional(),
    mobileNo: z.string().regex(/^\d{10}$/, "Mobile No. must be 10 digits number string. Example - '1234567890'").optional(),
    guardianMobileNo: z.string().regex(/^\d{10}$/, "Guardian mobile No. must be 10 digits number string. Example - '1234567890'").optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    remarks: z.string().optional(),
    photo: z.string().optional(),
}).strict();

export type StudentFormInputEdit = z.infer<typeof studentFormInputEdit>;