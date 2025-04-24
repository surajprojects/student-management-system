import { StudentData } from "./studentType";

export interface CourseData {
    id: string,
    code: string,
    name: string,
    instituteName: string,
    duration: number,
    fees: number,
    students: StudentData[],
};

export type CoursesList = CourseData[];