"use client"

import axiosInstance from "@/utils/axios";
import { errorHandle } from "@/utils/errors/errorHandle";
import { TrashIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify";
import { refreshData } from "@/store/atoms/refreshData";
import { useSetRecoilState } from "recoil";

export default function ActionBtnPymt({ studentId, studentCourseId, paymentId }: { studentId: string, studentCourseId: string, paymentId: string }) {

    const setReloadData = useSetRecoilState(refreshData);

    const handlePaymentDelete = async () => {
        try {
            const result = await axiosInstance.delete(`/students/${studentId}/studentcourse/${studentCourseId}/payment/${paymentId}`);
            if (result.status === 200) {
                toast.success('Payment deleted successfully!');
                setReloadData((prevData) => !prevData);
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <button type="button" onClick={handlePaymentDelete} className="hover:text-red-500"><TrashIcon className="w-6 h-6" /></button>
        </>
    );
};