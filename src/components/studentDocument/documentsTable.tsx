import ActionBtns from "./actionBtns";
import DocumentField from "./documentField";
import { StudentDocumentList } from "@/utils/common/studentDocumentType";

export default function DocumentsTable({ studentDocumentList }: { studentDocumentList: StudentDocumentList }) {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Document Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Institute
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Enrollment No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Id No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentDocumentList.length > 0 ?
                            studentDocumentList.map((studentDocument, idx) => {
                                return <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {idx + 1}
                                    </th>
                                    <DocumentField studentId={studentDocument.studentId} studentDocumentId={studentDocument.id} name={studentDocument.documentType} />
                                    <td className="px-6 py-4">
                                        {studentDocument.institute}
                                    </td>
                                    <td className="px-6 py-4">
                                        {studentDocument.enrollmentNo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {studentDocument.idNo}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ActionBtns studentId={studentDocument.studentId} studentDocumentId={studentDocument.id} />
                                    </td>
                                </tr>
                            })
                            :
                            <tr className="h-14"><td colSpan={6} className="text-center">No documents found!!!</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};