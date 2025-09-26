"use client"

import { useRecoilValue } from "recoil";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { refreshData } from "@/store/atoms/refreshData";
import { errorHandle } from "@/utils/errors/errorHandle";
import ActionBtns from "@/components/studentDocument/actionBtns";
import { StudentDocumentData } from "@/utils/common/studentDocumentType";
import StudentDocumentDetails from "@/components/studentDocument/documentDetails";

export default function StudentDocumentProfile({
    params
}: {
    params: { studentId: string, studentDocumentId: string }
}) {
    const initialData = {
        id: "",
        studentId: "",
        documentType: "",
        documentName: "",
        institute: "",
        instituteName: "",
        idNo: "",
        rollNo: "",
        enrollmentNo: "",
        passingSession: "",
        obtainedMarks: 0,
        totalMarks: 0,
        documentLink: "",
        createdAt: "",
        updatedAt: "",
    };

    const { studentId, studentDocumentId } = params;
    const [studentDocumentData, setStudentDocumentData] = useState<StudentDocumentData>(initialData);
    const reloadData = useRecoilValue(refreshData);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get(`/students/${studentId}/studentdocument/${studentDocumentId}`);
                if (result.status === 200) {
                    const data: StudentDocumentData = result.data.studentDocumentData;
                    setStudentDocumentData(data);
                }
            } catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [studentId, studentDocumentId, reloadData]);
    if (!studentDocumentData) {
        return (
            <>
                <div>
                    <div className="border-b-2 pb-2 mb-5">
                        <p className="text-3xl font-medium">Student Document Profile</p>
                    </div>
                    <div className="my-6 flex justify-center">
                        <p>Student document not found!!!</p>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <div className="border-b-2 pb-2 mb-5 flex justify-between">
                        <p className="text-3xl font-medium">Student Document Profile</p>
                        <div className="flex">
                            <ActionBtns studentId={studentId} studentDocumentId={studentDocumentId} />
                        </div>
                    </div>
                    <div className="my-8">
                        <StudentDocumentDetails studentDocumentData={studentDocumentData} />
                    </div>
                </div>
            </>
        );
    }
};