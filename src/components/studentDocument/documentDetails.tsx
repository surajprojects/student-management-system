import { StudentDocumentData } from "@/utils/common/studentDocumentType";

export default function StudentDocumentDetails({ studentDocumentData }: { studentDocumentData: StudentDocumentData }) {
    return (
        <>
            <ul className="text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <li>
                    <span className="font-medium">Document Type:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.documentType === "" ? "N/A" : studentDocumentData.documentType}</span>
                </li>
                <li>
                    <span className="font-medium">Document Name:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.documentName === "" ? "N/A" : studentDocumentData.documentName}</span>
                </li>
                <li>
                    <span className="font-medium">Institute:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.institute === "" ? "N/A" : studentDocumentData.institute}</span>
                </li>
                <li>
                    <span className="font-medium">Institute Name:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.instituteName === "" ? "N/A" : studentDocumentData.instituteName}</span>
                </li>
                <li>
                    <span className="font-medium">Id No:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.idNo === "" ? "N/A" : studentDocumentData.idNo}</span>
                </li>
                <li>
                    <span className="font-medium">Roll No:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.rollNo === "" ? "N/A" : studentDocumentData.rollNo}</span>
                </li>
                <li>
                    <span className="font-medium">Enrollment No:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.enrollmentNo === "" ? "N/A" : studentDocumentData.enrollmentNo}</span>
                </li>
                <li>
                    <span className="font-medium">Passing Session:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.passingSession === "" ? "N/A" : studentDocumentData.passingSession}</span>
                </li>
                <li>
                    <span className="font-medium">Obtained Marks:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.obtainedMarks ? studentDocumentData.obtainedMarks : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Total Marks:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.totalMarks ? studentDocumentData.totalMarks : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Percentage:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.totalMarks && studentDocumentData.obtainedMarks ? `${studentDocumentData.obtainedMarks / studentDocumentData.totalMarks * 100}%` : "N/A"}</span>
                </li>
                <li>
                    <span className="font-medium">Document Link:</span>
                    <span className="mx-2 capitalize">{studentDocumentData.documentLink === "" ? "N/A" : <a href={`${studentDocumentData.documentLink}`}>Click here</a>}</span>
                </li>
            </ul >
        </>
    );
};