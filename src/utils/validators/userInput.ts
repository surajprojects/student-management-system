import z from "zod";
import { Category, Gender } from "@/db/generated/prisma";

export const userFormInput = z.object({
    username: z.string(),
    password: z.string().min(8).max(32),
    email: z.string(),
    mobileNo: z.string().regex(/^\d{10}$/, "Mobile No. must be 10 digits number string. Example - '1234567890'"),
    name: z.string(),
    fatherName: z.string(),
    motherName: z.string(),
    dob: z.string().date(),
    address: z.string(),
    gender: z.enum([...Object.values(Gender)] as [Gender, ...Gender[]]),
    category: z.enum([...Object.values(Category)] as [Category, ...Category[]]),
    instituteName: z.string(),
    instituteAddress: z.string(),
    contactNoPrimary: z.string().regex(/^\d{10}$/, "Contact No. must be 10 digits number string. Example - '1234567890'"),
    contactNoSecondary: z.string().regex(/^\d{10}$/, "Contact No. must be 10 digits number string. Example - '1234567890'"),
    photo: z.string().optional(),
    remarks: z.string().optional(),
}).strict();

export type UserFormInput = z.infer<typeof userFormInput>;