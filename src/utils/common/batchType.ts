import { StudentData } from "./studentType";

export interface BatchData {
    id: string,
    code: string,
    name: string,
    time: string,
    students: StudentData[],
};

export type BatchesList = BatchData[];