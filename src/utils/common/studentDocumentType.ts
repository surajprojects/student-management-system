export interface StudentDocumentData {
    id: string,
    studentId: string,
    documentType: string,
    documentName: string,
    institute: string,
    instituteName: string,
    idNo: string,
    rollNo: string,
    enrollmentNo: string,
    passingSession: string,
    obtainedMarks: number,
    totalMarks: number,
    documentLink: string,
    createdAt: string,
    updatedAt: string,
};

export type StudentDocumentList = StudentDocumentData[];