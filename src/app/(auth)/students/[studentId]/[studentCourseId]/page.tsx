"use client"

import ActionBtns from "@/components/studentCourse/actionBtns";
import StudentCourseProfile from "@/components/studentCourse/studentCourseProfile";
import PaymentBtn from "@/components/students/paymentBtn";
import PaymentDetails from "@/components/students/paymentDetails";
import { refreshData } from "@/store/atoms/refreshData";
import axiosInstance from "@/utils/axios";
import { StudentCourseData } from "@/utils/common/studentCourseType";
import { errorHandle } from "@/utils/errors/errorHandle";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function StudentCourse({
    params
}: {
    params: { studentId: string, studentCourseId: string }
}) {
    const initialData = {
        id: "",
        batchId: "",
        courseId: "",
        studentId: "",
        enrolledOn: "",
        totalFees: 0,
        session: "",
        remarks: "",
        status: "",
        feesStatus: "",
        createdAt: "",
        updatedAt: "",
        students: [],
        batch: {
            id: "",
            code: "",
            name: "",
            time: "",
            students: [],
            createdAt: "",
            updatedAt: "",
        },
        course: {
            id: "",
            code: "",
            name: "",
            instituteName: "",
            duration: "",
            fees: 0,
            students: [],
            createdAt: "",
            updatedAt: "",
        },
        payments: [],
    };
    const { studentId, studentCourseId } = params;
    const reloadData = useRecoilValue(refreshData);
    const [data, setData] = useState<StudentCourseData>(initialData);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get(`/students/${studentId}/studentcourse/${studentCourseId}`);
                if (result.status === 200) {
                    const data = result.data.studentCourseData;
                    setData(data);
                }
            } catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [studentId, reloadData, studentCourseId]);
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-5 flex justify-between">
                    <p className="text-3xl font-medium">Student Course</p>
                    <ActionBtns studentId={studentId} studentCourseId={studentCourseId} />
                </div>
                <div>
                    <StudentCourseProfile studentCourseData={data} />
                </div>
                <div className="my-8">
                    <div className="border-b-2 pb-2 mb-5 flex justify-between">
                        <p className="text-3xl font-medium">Payments</p>
                        <PaymentBtn studentId={studentId} studentCourseId={studentCourseId} />
                    </div>
                    <PaymentDetails paymentData={data.payments} studentCourseId={studentCourseId} studentId={studentId} />
                </div>
            </div>
        </>
    );
};