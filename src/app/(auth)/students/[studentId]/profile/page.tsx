"use client"

import ActionBtns from "@/components/students/actionBtns";
import PaymentBtn from "@/components/students/paymentBtn";
import PaymentDetails from "@/components/students/paymentDetails";
import StudentDetails from "@/components/students/studentDetails";
import axiosInstance from "@/utils/axios";
import { StudentData } from "@/utils/common/studentType";
import { errorHandle } from "@/utils/errors/errorHandle";
import { useEffect, useState } from "react";

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
        gender: "",
        category: "",
        class: "",
        institute: "",
        instituteName: "",
        mobileNo: "",
        guardianMobileNo: "",
        email: "",
        address: "",
        courseId: "",
        batchId: "",
        enrolledOn: "",
        totalFees: 0,
        session: "",
        photo: "",
        remarks: "",
        createdAt: "",
        updatedAt: "",
        batch: {
            id: "",
            code: "",
            name: "",
            time: "",
            students: [],
        },
        course: {
            id: "",
            code: "",
            name: "",
            instituteName: "",
            duration: "",
            fees: 0,
            students: [],
        },
        payments: [],
    }
    const { studentId } = params;
    const [studentData, setStudentData] = useState<StudentData>(initialData);
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
    }, [studentId]);
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
                        <p className="text-3xl font-medium">{studentData.fullName}</p>
                        <div className="flex">
                            <PaymentBtn studentId={studentId} />
                            <ActionBtns studentId={studentId} />
                        </div>
                    </div>
                    <div className="my-8">
                        <StudentDetails studentData={studentData} />
                    </div>
                    <div className="my-8">
                        <div className="border-b-2 pb-2 mb-5 flex justify-between">
                            <p className="text-3xl font-medium">Payments</p>
                        </div>
                        <PaymentDetails paymentData={studentData.payments} studentId={studentId} />
                    </div>
                    <div>
                        <div className="border-b-2 pb-2 mb-5 flex justify-between">
                            <p className="text-3xl font-medium">Documents</p>
                        </div>
                        <div>
                            <p>No documents found!!!</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};