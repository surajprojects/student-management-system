"use client"

import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import { errorHandle } from "@/utils/errors/errorHandle";
import { TrashIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify";
import { refreshData } from "@/store/atoms/refreshData";
import { useSetRecoilState } from "recoil";
import EditCourseBtn from "./editCourseBtn";
import PaymentBtn from "../students/paymentBtn";

export default function ActionBtns({ studentId, studentCourseId }: { studentId: string, studentCourseId: string }) {
    const router = useRouter();
    const setReloadData = useSetRecoilState(refreshData);

    const handleDelete = async () => {
        try {
            const result = await axiosInstance.delete(`/students/${studentId}/studentcourse/${studentCourseId}`);
            if (result.status === 200) {
                toast.success('Course deleted successfully!');
                router.push(`/students/${studentId}/profile`);
                setReloadData((prevData) => !prevData);
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <div className="flex items-center">
                <PaymentBtn studentCourseId={studentCourseId} studentId={studentId} />
                <EditCourseBtn studentId={studentId} studentCourseId={studentCourseId} />
                <button onClick={handleDelete} className="hover:text-red-500"><TrashIcon className="w-6 h-6" /></button>
            </div>
        </>
    );
};