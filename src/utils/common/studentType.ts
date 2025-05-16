import { BatchData } from "./batchType";
import { CourseData } from "./courseType";
import { PaymentsList } from "./paymentType";

export interface StudentData {
    id: string,
    userId: string,
    fullName: string,
    fatherName: string,
    motherName: string,
    dob: string,
    gender: string,
    category: string,
    class: string,
    institute: string,
    instituteName?: string,
    mobileNo: string,
    guardianMobileNo: string,
    email: string,
    address: string,
    courseId: string,
    batchId: string,
    enrolledOn: string,
    totalFees: number,
    session: string,
    photo?: string,
    remarks?: string,
    createdAt: string,
    updatedAt: string,
    batch: BatchData,
    course: CourseData,
    payments: PaymentsList,
};

export type StudentsList = StudentData[];

export interface StudentFeesData {
    id: string,
    fullName: string,
    fatherName: string,
    course: string,
    session: string,
    totalFees: number,
    paidFees: number,
};

export type StudentsFeesList = StudentFeesData[];