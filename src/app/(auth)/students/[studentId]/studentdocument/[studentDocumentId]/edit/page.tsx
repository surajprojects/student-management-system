"use client"

import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import { StudentDocumentInputEdit } from "@/utils/validators/studentDocumentInput";
import StudentDocumentForm from "@/components/studentDocument/studentDocumentForm";

export default function EditStudentDocument({
    params
}: {
    params: { studentId: string, studentDocumentId: string }
}) {
    const router = useRouter();
    const { studentId, studentDocumentId } = params;

    const handleSubmit = async (formData: StudentDocumentInputEdit, studentId = "", studentDocumentId = "") => {
        try {
            const result = await axiosInstance.patch(`/students/${studentId}/studentdocument/${studentDocumentId}`, formData);
            router.push(`/students/${result.data.studentDocumentData.studentId}/studentdocument/${result.data.studentDocumentData.id}/profile`);
            toast.success("Successfully edited document!");
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
                    <p className="text-3xl font-medium">Edit Student Document</p>
                </div>
                <div className="my-8">
                    <StudentDocumentForm
                        handleEditSubmitForm={handleSubmit}
                        studentId={studentId}
                        studentDocumentId={studentDocumentId}
                        isEdit={true}
                    />
                </div>
            </div>
        </>
    );
};