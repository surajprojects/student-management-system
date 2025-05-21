import { StudentsFeesList } from "@/utils/common/studentType";
import TableField from "../students/tableField";

export default function Table({ studentsFeesData }: { studentsFeesData: StudentsFeesList }) {
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
                                Student&apos;s Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Father&apos;s Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Fees
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Paid Fees
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Due Fees
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fees Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsFeesData.length > 0 ?
                            studentsFeesData.map((student, idx) => {
                                return <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {idx + 1}
                                    </th>
                                    <TableField studentId={student.id} name={student.fullName} />
                                    <td className="px-6 py-4">
                                        {student.fatherName}
                                    </td>
                                    <td className="px-6 py-4">
                                        Rs.{student.totalFees}/-
                                    </td>
                                    <td className="px-6 py-4">
                                        Rs.{student.paidFees}/-
                                    </td>
                                    <td className="px-6 py-4">
                                        Rs.{student.totalFees - student.paidFees}/-
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.status[0].feesStatus}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.status[0].status}
                                    </td>
                                </tr>
                            })
                            :
                            <tr className="h-14"><td colSpan={8} className="text-center">No student found!!!</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};