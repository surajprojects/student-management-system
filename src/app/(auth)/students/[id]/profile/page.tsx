"use client"

import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

export default function ProfileStudent({
    params
}: {
    params: { id: string }
}) {
    const { id } = params;
    const [studentData, setStudentData] = useState({
        fullName: "",
        fatherName: "",
        motherName: "",
        dob: "",
        class: "",
        institute: "",
        instituteName: "",
        gender: "",
        category: "",
        mobileNo: "",
        guardianMobileNo: "",
        email: "",
        address: "",
        course: { name: "" },
        enrolledOn: "",
        totalFees: "",
        batch: { code: "" },
        session: "",
        remarks: "",
    });

    useEffect(() => {
        const getData = async () => {
            const result = await axiosInstance.get(`/students/${id}`);
            const data = result.data.studentData;
            setStudentData((prevData) => {
                return {
                    ...prevData,
                    fullName: data.fullName ? data.fullName : "",
                    fatherName: data.fatherName ? data.fatherName : "",
                    motherName: data.motherName ? data.motherName : "",
                    dob: data.dob ? data.dob.split("T")[0] : "",
                    class: data.class,
                    institute: data.institute ? data.institute : "",
                    instituteName: data.instituteName ? data.instituteName : "",
                    gender: data.gender ? data.gender : "",
                    category: data.category ? data.category : "",
                    mobileNo: data.mobileNo ? data.mobileNo : "",
                    guardianMobileNo: data.guardianMobileNo ? data.guardianMobileNo : "",
                    email: data.email ? data.email : "",
                    address: data.address ? data.address : "",
                    course: data.course ? data.course : "",
                    enrolledOn: data.enrolledOn ? data.enrolledOn.split("T")[0] : "",
                    totalFees: data.totalFees ? String(data.totalFees) : "",
                    batch: data.batch ? data.batch : "",
                    session: data.session ? data.session : "",
                    remarks: data.remarks ? data.remarks : "",
                }
            });
        };
        getData();
    }, []);
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-5">
                    <p className="text-3xl font-medium">{studentData.fullName}</p>
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
                            <span className="mx-2">{studentData.instituteName === "" ? "N/A" : studentData.instituteName}</span>
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
                            <span className="mx-2">{studentData.email === "" ? "N/A" : studentData.email}</span>
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
                            <span className="mx-2">{studentData.totalFees === "" ? "N/A" : studentData.totalFees}</span>
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
                            <span className="mx-2">{studentData.remarks === "" ? "N/A" : studentData.remarks}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};