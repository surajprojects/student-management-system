"use client"

import Link from "next/link";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function ActionBtns({ studentId, studentDocumentId }: { studentId: string, studentDocumentId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const result = await axiosInstance.delete(`/students/${studentId}/studentdocument/${studentDocumentId}`);
            if (result.status === 200) {
                toast.success("Document deleted successfully!");
                router.push(`/students/${studentId}/profile`);
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <div className="flex items-center">
                <Link href={`/students/${studentId}/studentdocument/${studentDocumentId}/edit`} className="hover:text-blue-500"><PencilIcon className="w-6 h-6 mx-2" /></Link>
                <button onClick={handleDelete} className="hover:text-red-500"><TrashIcon className="w-6 h-6" /></button>
            </div>
        </>
    );
};