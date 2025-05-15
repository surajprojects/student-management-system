"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import CourseEditForm from "./courseEditForm";
import { errorHandle } from "@/utils/errors/errorHandle";
import { TrashIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline"

export default function CourseActionBtns({ courseId }: { courseId: string }) {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);

    const handleDelete = async () => {
        try {
            const result = await axiosInstance.delete(`/course/${courseId}`);
            if (result.status === 200) {
                toast.success('Course deleted successfully!!!');
                router.push("/course");
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <div className="flex items-center">
                <button onClick={() => setShowForm(true)} className="hover:text-blue-500">
                    <PencilIcon className="w-6 h-6 mx-2" />
                </button>
                <button onClick={handleDelete} className="hover:text-red-500"><TrashIcon className="w-6 h-6" /></button>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                        >
                            <XMarkIcon className="h-5 w-5 bg-gray-50 rounded-full" />
                        </button>

                        <div className="border-b-2 pb-2 mb-5">
                            <p className="text-2xl font-semibold">Edit Course</p>
                        </div>
                        <CourseEditForm displayForm={setShowForm} courseId={courseId} />
                    </div>
                </div>
            )}
        </>
    );
};