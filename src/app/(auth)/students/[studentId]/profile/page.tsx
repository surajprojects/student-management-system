"use client"

import { useRecoilValue } from "recoil";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { refreshData } from "@/store/atoms/refreshData";
import { errorHandle } from "@/utils/errors/errorHandle";
import { StudentData } from "@/utils/common/studentType";
import ActionBtns from "@/components/students/actionBtns";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import StudentDetails from "@/components/students/studentDetails";
import AddCourseBtn from "@/components/studentCourse/addCourseBtn";
import CourseDetails from "@/components/studentCourse/courseDetails";
import DocumentsTable from "@/components/studentDocument/documentsTable";

export default function ProfileStudent({
    params
}: {
    params: { studentId: string }
}) {
    const initialData = {
        id: "",
        userId: "",
        fullName: "",
        fatherName: "",
        motherName: "",
        dob: "",
        class: "",
        gender: "",
        category: "",
        institute: "",
        instituteName: "",
        mobileNo: "",
        guardianMobileNo: "",
        email: "",
        address: "",
        photo: "",
        remarks: "",
        createdAt: "",
        updatedAt: "",
        studentCourses: [],
        payments: [],
        documents: [],
    };

    const { studentId } = params;
    const [studentData, setStudentData] = useState<StudentData>(initialData);
    const reloadData = useRecoilValue(refreshData);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get(`/students/${studentId}`);
                if (result.status === 200) {
                    const data = result.data.studentData;
                    setStudentData(data);
                }
            } catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [studentId, reloadData]);
    if (!studentData) {
        return (
            <>
                <div>
                    <div className="border-b-2 pb-2 mb-5">
                        <p className="text-3xl font-medium">Student Profile</p>
                    </div>
                    <div className="my-6 flex justify-center">
                        <p>Student not found!!!</p>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <div className="border-b-2 pb-2 mb-5 flex justify-between">
                        <p className="text-3xl font-medium capitalize">{studentData.fullName === "" ? "N/A" : studentData.fullName}</p>
                        <div className="flex">
                            <ActionBtns studentId={studentId} />
                        </div>
                    </div>
                    <div className="my-8">
                        <StudentDetails studentData={studentData} />
                    </div>
                    <div className="my-8">
                        <div className="border-b-2 pb-2 mb-5 flex justify-between">
                            <p className="text-3xl font-medium">Courses</p>
                            <AddCourseBtn studentId={studentId} />
                        </div>
                        <CourseDetails studentCourse={studentData.studentCourses} studentId={studentData.id} />
                    </div>
                    <div>
                        <div className="border-b-2 pb-2 mb-5 flex justify-between">
                            <p className="text-3xl font-medium">Documents</p>
                            <a href={`/students/${studentId}/studentdocument/new`} className="hover:cursor-pointer rounded-full flex items-center hover:shadow">
                                <PlusCircleIcon className="w-9 h-6 text-black" />
                            </a>
                        </div>
                        <DocumentsTable studentDocumentList={studentData.documents} />
                    </div>
                </div>
            </>
        );
    }
};