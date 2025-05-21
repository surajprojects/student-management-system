import { StudentData } from "./studentType";

export interface PaymentData {
    id: string,
    studentId: string,
    amount: number,
    method: string,
    date: string,
    students: StudentData[],
    createdAt: string,
    updatedAt: string,
};

export type PaymentsList = PaymentData[];