"use client";

import { useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import StudentCourseForm from "./studentCourseForm";

export default function EditCourseBtn({ studentId = "", studentCourseId = "" }: { studentId: string, studentCourseId: string }) {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <button onClick={() => setShowForm(true)} className="hover:text-blue-500">
                <PencilIcon className="w-6 h-6 mx-2" />
            </button>

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
                            <p className="text-2xl font-semibold text-black">Edit Course</p>
                        </div>
                        <StudentCourseForm
                            studentId={studentId}
                            studentCourseId={studentCourseId}
                            displayForm={setShowForm}
                            isEdit={true}
                        />
                    </div>
                </div>
            )}
        </>
    );
};