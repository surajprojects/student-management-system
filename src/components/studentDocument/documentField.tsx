"use client"

import { useRouter } from "next/navigation";

export default function DocumentField({ studentId, studentDocumentId, name }: { studentId: string, studentDocumentId: string, name: string }) {
    const router = useRouter();
    return (
        <>
            <th scope="row" onClick={() => router.push(`/students/${studentId}/studentdocument/${studentDocumentId}/profile`)} className="px-6 py-4 font-medium hover:cursor-pointer text-gray-900 whitespace-nowrap dark:text-white">
                {name}
            </th>
        </>
    );
};