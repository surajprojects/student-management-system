import z from "zod";

export const courseFormInput = z.object({
    code: z.string(),
    name: z.string(),
    instituteName: z.string(),
    duration: z.string(),
    fees: z.number(),
}).strict();

export type CourseFormInput = z.infer<typeof courseFormInput>;

export const courseFormInputEdit = z.object({
    code: z.string().optional(),
    name: z.string().optional(),
    instituteName: z.string().optional(),
    duration: z.string().optional(),
    fees: z.number().optional(),
}).strict();

export type CourseFormInputEdit = z.infer<typeof courseFormInputEdit>;