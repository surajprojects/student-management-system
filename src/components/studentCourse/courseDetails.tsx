import { StudentCourseList } from "@/utils/common/studentCourseType";
import { formatDate } from "@/utils/dateAndTime";
import ActionBtns from "./actionBtns";
import CourseField from "./courseField";

export default function CourseDetails({ studentCourse, studentId }: { studentCourse: StudentCourseList, studentId: string }) {
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
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Enrolled On
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Fees
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Due Fees
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fees Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentCourse.length > 0 ?
                            studentCourse.map((course, idx) => {
                                return <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {idx + 1}
                                    </th>
                                    <CourseField studentId={studentId} studentCourseId={course.id} name={course.course.code} />
                                    <td className="px-6 py-4">
                                        {formatDate(course.enrolledOn.split("T")[0])}
                                    </td>
                                    <td className="px-6 py-4">
                                        Rs.{course.totalFees}/-
                                    </td>
                                    <td className="px-6 py-4">
                                        Rs.{course.payments.length > 0 ? course.totalFees - course.payments.reduce((sum, payment) => sum + payment.amount, 0) : 0}/-
                                    </td>
                                    <td className="px-6 py-4">
                                        {course.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        {course.feesStatus}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ActionBtns studentId={studentId} studentCourseId={course.id} />
                                    </td>
                                </tr>
                            })
                            :
                            <tr className="h-14"><td colSpan={8} className="text-center">No courses found!!!</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};