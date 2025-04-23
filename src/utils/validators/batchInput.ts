import z from "zod";

export const batchFormInput = z.object({
    code: z.string(),
    name: z.string(),
    time: z.string(),
}).strict();

export type BatchFormInput = z.infer<typeof batchFormInput>;

export const batchFormInputEdit = z.object({
    code: z.string().optional(),
    name: z.string().optional(),
    time: z.string().optional(),
}).strict();

export type BatchFormInputEdit = z.infer<typeof batchFormInputEdit>;