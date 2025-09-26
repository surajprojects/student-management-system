"use client"

import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import { StudentDocumentInput } from "@/utils/validators/studentDocumentInput";
import StudentDocumentForm from "@/components/studentDocument/studentDocumentForm";

export default function NewStudentDocument({
    params
}: {
    params: { studentId: string }
}) {
    const router = useRouter();
    const { studentId } = params;
    const handleSubmit = async (formData: StudentDocumentInput) => {
        try {
            const result = await axiosInstance.post(`/students/${studentId}/studentdocument`, formData);
            router.push(`/students/${result.data.studentDocumentData.studentId}/studentdocument/${result.data.studentDocumentData.id}/profile`);
            toast.success("Document created successfully!");
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
                    <p className="text-3xl font-medium">Add Student Document</p>
                </div>
                <div className="my-8">
                    <StudentDocumentForm handleSubmitForm={handleSubmit} studentId={studentId} />
                </div>
            </div>
        </>
    );
};