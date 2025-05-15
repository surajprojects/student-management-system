import ActionBtns from "./actionBtns";
import { formatDate } from "@/utils/dateAndTime";

export default function BatchList({ batchData }: { batchData: StudentsList }) {
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
                                Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsData.length > 0 ?
                            studentsData.map((student, idx: number) => {
                                return <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <td className="px-6 py-4">
                                        {idx + 1}
                                    </td>
                                    <TableField studentId={student.id} name={student.fullName} />
                                    <td className="px-6 py-4">
                                        {student.fatherName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.gender}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.mobileNo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.course.code}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.batch.code}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.session}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatDate(student.enrolledOn.split("T")[0])}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ActionBtns studentId={student.id} />
                                    </td>
                                </tr>
                            })
                            :
                            <tr className="h-14"><td colSpan={11} className="text-center">No students found!!!</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};