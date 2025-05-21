"use client"

import { useRouter } from "next/navigation";

export default function TableField({ studentId, name }: { studentId: string, name: string }) {
    const router = useRouter();
    return (
        <>
            <th scope="row" onClick={() => router.push(`/students/${studentId}/profile`)} className="px-6 py-4 font-medium hover:cursor-pointer text-gray-900 whitespace-nowrap capitalize">
                {name}
            </th>
        </>
    );
};