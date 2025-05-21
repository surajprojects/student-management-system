"use client"

import { useRouter } from "next/navigation";

export default function CourseField({ studentId, studentCourseId, name }: { studentId: string, studentCourseId: string, name: string }) {
    const router = useRouter();
    return (
        <>
            <th scope="row" onClick={() => router.push(`/students/${studentId}/${studentCourseId}`)} className="px-6 py-4 font-medium hover:cursor-pointer text-gray-900 whitespace-nowrap dark:text-white">
                {name}
            </th>
        </>
    );
};