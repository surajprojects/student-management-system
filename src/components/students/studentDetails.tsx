import { StudentData } from "@/utils/common/studentType";
import { formatDate } from "@/utils/dateAndTime";

export default function StudentDetails({ studentData }: { studentData: StudentData }) {
    return (
        <>
            <ul className="text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <li>
                    <span className="font-medium">Father&apos;s Name:</span>
                    <span className="mx-2">{studentData.fatherName === "" ? "N/A" : studentData.fatherName}</span>
                </li>
                <li>
                    <span className="font-medium">Mother&apos;s Name:</span>
                    <span className="mx-2">{studentData.motherName === "" ? "N/A" : studentData.motherName}</span>
                </li>
                <li>
                    <span className="font-medium">Date of Birth:</span>
                    <span className="mx-2">{studentData.dob === "" ? "N/A" : formatDate(studentData.dob.split("T")[0])}</span>
                </li>
                <li>
                    <span className="font-medium">Gender:</span>
                    <span className="mx-2">{studentData.gender === "" ? "N/A" : studentData.gender}</span>
                </li>
                <li>
                    <span className="font-medium">Category:</span>
                    <span className="mx-2">{studentData.category === "" ? "N/A" : studentData.category}</span>
                </li>
                <li>
                    <span className="font-medium">Class:</span>
                    <span className="mx-2">{studentData.class === "" ? "N/A" : studentData.class}</span>
                </li>
                <li>
                    <span className="font-medium">Institute:</span>
                    <span className="mx-2">{studentData.institute === "" ? "N/A" : studentData.institute}</span>
                </li>
                <li>
                    <span className="font-medium">Institute Name:</span>
                    <span className="mx-2">{!(studentData.instituteName) ? "N/A" : studentData.instituteName}</span>
                </li>
                <li>
                    <span className="font-medium">Mobile No.:</span>
                    <span className="mx-2">{studentData.mobileNo === "" ? "N/A" : studentData.mobileNo}</span>
                </li>
                <li>
                    <span className="font-medium">Guardian&apos;s Mobile No.:</span>
                    <span className="mx-2">{studentData.guardianMobileNo === "" ? "N/A" : studentData.guardianMobileNo}</span>
                </li>
                <li>
                    <span className="font-medium">Email:</span>
                    <span className="mx-2">{!(studentData.email) ? "N/A" : studentData.email}</span>
                </li>
                <li>
                    <span className="font-medium">Address:</span>
                    <span className="mx-2">{studentData.address === "" ? "N/A" : studentData.address}</span>
                </li>
                <li>
                    <span className="font-medium">Course:</span>
                    <span className="mx-2">{studentData.course.name === "" ? "N/A" : studentData.course.name}</span>
                </li>
                <li>
                    <span className="font-medium">Enrolled On:</span>
                    <span className="mx-2">{studentData.enrolledOn === "" ? "N/A" : formatDate(studentData.enrolledOn.split("T")[0])}</span>
                </li>
                <li>
                    <span className="font-medium">Total Fees:</span>
                    <span className="mx-2">{String(studentData.totalFees) === "" ? "N/A" : studentData.totalFees}</span>
                </li>
                <li>
                    <span className="font-medium">Batch:</span>
                    <span className="mx-2">{studentData.batch.code === "" ? "N/A" : studentData.batch.code}</span>
                </li>
                <li>
                    <span className="font-medium">Session:</span>
                    <span className="mx-2">{studentData.session === "" ? "N/A" : studentData.session}</span>
                </li>
                <li>
                    <span className="font-medium">Remarks:</span>
                    <span className="mx-2">{!(studentData.remarks) ? "N/A" : studentData.remarks}</span>
                </li>
            </ul>
        </>
    );
};