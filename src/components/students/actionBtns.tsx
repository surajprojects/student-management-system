"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { errorHandle } from "@/utils/errors/errorHandle";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify";

export default function ActionBtns({ studentId }: { studentId: string }) {
    const router = useRouter();
    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/students/${id}`);
            toast.success('Student deleted successfully!');
            router.push("/students");
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <div className="flex items-center">
                <Link href={`/students/${studentId}/edit`} className="hover:text-blue-500"><PencilIcon className="w-6 h-6 mx-2" /></Link>
                <button onClick={() => handleDelete(studentId)} className="hover:text-red-500"><TrashIcon className="w-6 h-6" /></button>
            </div>
        </>
    );
};