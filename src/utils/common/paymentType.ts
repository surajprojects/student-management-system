import { StudentData } from "./studentType";

export interface PaymentData {
    id: string,
    studentId: string,
    amount: number,
    method: string,
    date: string,
    students: StudentData[],
};

export type PaymentsList = PaymentData[];