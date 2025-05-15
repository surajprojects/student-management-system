"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { errorHandle } from "@/utils/errors/errorHandle";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify";

export default function ActionBtns({ studentId, paymentBtn = false, paymentId = "" }: { studentId: string, paymentBtn?: boolean, paymentId?: string }) {

    const router = useRouter();

    const handleDelete = async () => {
        try {
            const result = await axiosInstance.delete(`/students/${studentId}`);
            if (result.status === 200) {
                toast.success('Student deleted successfully!');
                router.push("/students");
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    const handlePaymentDelete = async () => {
        try {
            const result = await axiosInstance.delete(`/students/${studentId}/payment/${paymentId}`);
            if (result.status === 200) {
                toast.success('Payment deleted successfully!');
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            {paymentBtn ?
                <button type="button" onClick={handlePaymentDelete} className="hover:text-red-500"><TrashIcon className="w-6 h-6" /></button>
                :
                <div className="flex items-center">
                    <Link href={`/students/${studentId}/edit`} className="hover:text-blue-500"><PencilIcon className="w-6 h-6 mx-2" /></Link>
                    <button onClick={handleDelete} className="hover:text-red-500"><TrashIcon className="w-6 h-6" /></button>
                </div>
            }
        </>
    );
};