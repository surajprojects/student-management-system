import { PaymentsList } from "./paymentType";
import { StudentCourseList } from "./studentCourseType";

export interface StudentData {
    id: string,
    userId: string,
    fullName: string,
    fatherName: string,
    motherName: string,
    dob: string,
    class: string,
    gender: string,
    category: string,
    institute: string,
    instituteName?: string,
    mobileNo: string,
    guardianMobileNo: string,
    email: string,
    address: string,
    photo?: string,
    remarks?: string,
    createdAt: string,
    updatedAt: string,
    studentCourses: StudentCourseList,
    payments: PaymentsList,
};

export type StudentsList = StudentData[];

export interface StudentFeesData {
    id: string,
    fullName: string,
    fatherName: string,
    totalFees: number,
    paidFees: number,
    status: {
        status: string,
        feesStatus: string,
    }[],
};

export type StudentsFeesList = StudentFeesData[];