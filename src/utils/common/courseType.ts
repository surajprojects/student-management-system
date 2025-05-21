import { StudentData } from "./studentType";

export interface CourseData {
    id: string,
    code: string,
    name: string,
    instituteName: string,
    duration: string,
    fees: number,
    students: StudentData[],
    createdAt: string,
    updatedAt: string,
};

export type CoursesList = CourseData[];