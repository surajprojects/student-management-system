"use client"

import axiosInstance from "@/utils/axios";
import Card from "@/components/students/card";
import { toast } from "react-toastify";
import { StudentFormInputEdit } from "@/utils/validators/studentInput";
import { errorHandle } from "@/utils/errors/errorHandle";

export default function EditStudent({
    params
}: {
    params: { id: string }
}) {
    const { id } = params;

    const handleSubmit = async (formData: StudentFormInputEdit, id = "") => {
        try {
            await axiosInstance.patch(`/students/${id}`, formData);
            toast.success('Successfully edited student details!');
        } catch (error) {
            errorHandle(error);
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
                        studentId={id}
                        isEdit={true}
                    />
                </div>
            </div>
        </>
    );
};