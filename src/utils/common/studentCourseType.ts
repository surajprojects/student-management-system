import { BatchData } from "./batchType";
import { CourseData } from "./courseType";
import { PaymentsList } from "./paymentType";
import { StudentData } from "./studentType";

export interface StudentCourseData {
    id: string,
    batchId: string,
    courseId: string,
    studentId: string,
    enrolledOn: string,
    totalFees: number,
    session: string,
    remarks?: string,
    status: string,
    feesStatus: string,
    createdAt: string,
    updatedAt: string,
    students: StudentData[],
    batch: BatchData,
    course: CourseData,
    payments: PaymentsList,
};

export type StudentCourseList = StudentCourseData[];