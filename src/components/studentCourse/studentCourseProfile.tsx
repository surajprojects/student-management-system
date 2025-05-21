import { StudentCourseData } from "@/utils/common/studentCourseType";
import { formatDate } from "@/utils/dateAndTime";

export default function StudentCourseProfile({ studentCourseData }: { studentCourseData: StudentCourseData }) {
    return (
        <>
            <ul className="text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <li>
                    <span className="font-medium">Course Code:</span>
                    <span className="mx-2">{studentCourseData.course.code === "" ? "N/A" : studentCourseData.course.code}</span>
                </li>
                <li>
                    <span className="font-medium">Course Name:</span>
                    <span className="mx-2">{studentCourseData.course.name === "" ? "N/A" : studentCourseData.course.name}</span>
                </li>
                <li>
                    <span className="font-medium">Institute:</span>
                    <span className="mx-2">{studentCourseData.course.instituteName === "" ? "N/A" : studentCourseData.course.instituteName}</span>
                </li>
                <li>
                    <span className="font-medium">Duration:</span>
                    <span className="mx-2">{studentCourseData.course.duration === "" ? "N/A" : studentCourseData.course.duration}</span>
                </li>
                <li>
                    <span className="font-medium">Batch Code:</span>
                    <span className="mx-2">{studentCourseData.batch.code === "" ? "N/A" : studentCourseData.batch.code}</span>
                </li>
                <li>
                    <span className="font-medium">Batch Name:</span>
                    <span className="mx-2">{studentCourseData.batch.name === "" ? "N/A" : studentCourseData.batch.name}</span>
                </li>
                <li>
                    <span className="font-medium">Batch Time:</span>
                    <span className="mx-2">{studentCourseData.batch.time === "" ? "N/A" : studentCourseData.batch.time}</span>
                </li>
                <li>
                    <span className="font-medium">Enrolled On:</span>
                    <span className="mx-2">{studentCourseData.enrolledOn === "" ? "N/A" : formatDate(studentCourseData.enrolledOn.split("T")[0])}</span>
                </li>
                <li>
                    <span className="font-medium">Total Fees:</span>
                    <span className="mx-2">{!(studentCourseData.totalFees) ? "N/A" : `Rs.${String(studentCourseData.totalFees)}/-`}</span>
                </li>
                <li>
                    <span className="font-medium">Remarks:</span>
                    <span className="mx-2">{!(studentCourseData.remarks) ? "N/A" : studentCourseData.remarks}</span>
                </li>
                <li>
                    <span className="font-medium">Status:</span>
                    <span className="mx-2">{studentCourseData.status === "" ? "N/A" : studentCourseData.status}</span>
                </li>
                <li>
                    <span className="font-medium">Fees Status:</span>
                    <span className="mx-2">{studentCourseData.feesStatus === "" ? "N/A" : studentCourseData.feesStatus}</span>
                </li>
            </ul >
        </>
    );
};