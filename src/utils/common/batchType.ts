import { StudentData } from "./studentType";

export interface BatchData {
    id: string,
    code: string,
    name: string,
    time: string,
    students: StudentData[],
    createdAt: string,
    updatedAt: string,
};

export type BatchesList = BatchData[];