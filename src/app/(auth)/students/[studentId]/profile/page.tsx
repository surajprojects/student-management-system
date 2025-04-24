import ActionBtns from "@/components/students/actionBtns";
import axiosInstance from "@/utils/axios";
import { StudentData } from "@/utils/common/studentType";

const getStudentData = async (studentId: string) => {
    try {
        const result = await axiosInstance.get(`/students/${studentId}`);
        if (result.status === 200) {
            const data = result.data.studentData;
            return data;
        }
        else {
            return {};
        }
    } catch (error) {
        console.error(error);
    }
};

export default async function ProfileStudent({
    params
}: {
    params: { studentId: string }
}) {
    const { studentId } = params;
    const studentData: StudentData = await getStudentData(studentId);
    if (!studentData) {
        return (
            <>
                <div>
                    <div className="border-b-2 pb-2 mb-5">
                        <p className="text-3xl font-medium">Student Profile</p>
                    </div>
                    <div className="my-6 flex justify-center">
                        <p>Student not found!!!</p>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <div className="border-b-2 pb-2 mb-5 flex justify-between">
                        <p className="text-3xl font-medium">{studentData.fullName}</p>
                        <ActionBtns studentId={studentId} />
                    </div>
                    <div className="my-8">
                        <ul className="text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <li>
                                <span className="font-medium">Father's Name:</span>
                                <span className="mx-2">{studentData.fatherName === "" ? "N/A" : studentData.fatherName}</span>
                            </li>
                            <li>
                                <span className="font-medium">Mother's Name:</span>
                                <span className="mx-2">{studentData.motherName === "" ? "N/A" : studentData.motherName}</span>
                            </li>
                            <li>
                                <span className="font-medium">Date of Birth:</span>
                                <span className="mx-2">{studentData.dob === "" ? "N/A" : studentData.dob}</span>
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
                                <span className="font-medium">Guardian's Mobile No.:</span>
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
                                <span className="mx-2">{studentData.enrolledOn === "" ? "N/A" : studentData.enrolledOn}</span>
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
                    </div>
                </div>
            </>
        );
    }
};