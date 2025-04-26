"use client"

import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import Card from "@/components/students/card";
import { toast } from "react-toastify";
import { StudentFormInputEdit } from "@/utils/validators/studentInput";
import { errorHandle } from "@/utils/errors/errorHandle";

export default function EditStudent({
    params
}: {
    params: { studentId: string }
}) {
    const router = useRouter();
    const { studentId } = params;

    const handleSubmit = async (formData: StudentFormInputEdit, studentId = "") => {
        try {
            const result = await axiosInstance.patch(`/students/${studentId}`, formData);
            router.push(`/students/${result.data.studentData.id}/profile`);
            toast.success('Successfully edited student details!');
            return true;
        } catch (error) {
            errorHandle(error);
            return false;
        }
    };
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-5">
                    <p className="text-3xl font-medium">Edit Student Details</p>
                </div>
                <div className="my-8">
                    <Card
                        handleSubmitForm={handleSubmit}
                        studentId={studentId}
                        isEdit={true}
                    />
                </div>
            </div>
        </>
    );
};