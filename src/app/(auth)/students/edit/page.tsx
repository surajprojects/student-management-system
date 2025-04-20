"use client"

import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
import Card from "@/components/students/card";
import { toast } from "react-toastify";
import { StudentFormInputEdit } from "@/utils/validators/studentInput";

export default function EditStudent() {
    const handleSubmit = async (formData: StudentFormInputEdit, id = "") => {
        try {
            await axiosInstance.patch(`/students/${id}`, formData);
            toast.success('Successfully edited student details!');
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                if (error.message === 'Network Error') {
                    console.error('No internet connection, please check your network.');
                }
                else if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 400 || statusCode === 411) {
                        toast.error('Bad Request. Please check your input.');
                    } else if (statusCode === 401) {
                        toast.error('Unauthorized. Please login again.');
                    } else if (statusCode === 500) {
                        toast.error('Server error. Please try again later.');
                    } else {
                        toast.error(`Error: ${statusCode}`);
                    }
                }
                else {
                    toast.error('An unexpected error occurred.');
                    console.error('An unexpected error occurred:', error.message);
                }
            }
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
                        studentId="cm9pgf7pz0009uxycp5x6ic7t"
                        isEdit={true}
                    />
                </div>
            </div>
        </>
    );
};