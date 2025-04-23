"use client"

import axiosInstance from "@/utils/axios";
import Card from "@/components/students/card";
import { toast } from "react-toastify";
import { StudentFormInput } from "@/utils/validators/studentInput";
import { errorHandle } from "@/utils/errors/errorHandle";

export default function NewStudent() {
    const handleSubmit = async (formData: StudentFormInput) => {
        try {
            await axiosInstance.post('/students', formData);
            toast.success('Student created successfully!');
        } catch (error) {
            errorHandle(error);
        }
    };
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-5">
                    <p className="text-3xl font-medium">New Student Admission</p>
                </div>
                <div className="my-8">
                    <Card handleSubmitForm={handleSubmit} />
                </div>
            </div>
        </>
    );
};