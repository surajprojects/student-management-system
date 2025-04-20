"use client"

import { useState } from "react";
import { Institute, Gender, Category } from "@/db/generated/prisma";
import { StudentFormInput } from "@/utils/validators/studentInput";

interface initialDataType {
    fullName: string,
    fatherName: string,
    motherName: string,
    dob: string,
    class: string,
    institute: string,
    instituteName: string,
    gender: string,
    category: string,
    mobileNo: string,
    guardianMobileNo: string,
    email: string,
    address: string,
    course: string,
    enrolledOn: string,
    totalFees: string,
    batch: string,
    session: string,
    remarks: string,
};

export default function Card({
    handleSubmitForm,
    initialData = {
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
        course: "",
        enrolledOn: "",
        totalFees: "",
        batch: "",
        session: "",
        remarks: "",
    },
    studentId,
    isEdit = false
}: {
    handleSubmitForm: (data: StudentFormInput, id?: string) => void,
    initialData?: initialDataType,
    studentId?: string,
    isEdit?: boolean
}) {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (evt: any) => {
        const fieldName = evt.target.name;
        const changedValue = evt.target.value;
        setFormData((prevData) => {
            return {
                ...prevData,
                [fieldName]: changedValue
            }
        });
    };

    return (
        <>
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    if (!Object.values(Institute).includes(formData.institute as Institute)) {
                        throw new Error("Invalid institute");
                    }
                    if (!Object.values(Gender).includes(formData.gender as Gender)) {
                        throw new Error("Invalid gender");
                    }
                    if (!Object.values(Category).includes(formData.category as Category)) {
                        throw new Error("Invalid category");
                    }
                    handleSubmitForm({
                        ...formData,
                        institute: formData.institute as Institute,
                        gender: formData.gender as Gender,
                        category: formData.category as Category,
                    }, studentId);
                    setFormData({
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
                        course: "",
                        enrolledOn: "",
                        totalFees: "",
                        batch: "",
                        session: "",
                        remarks: "",
                    })
                }
                }
                className="grid grid-cols-1 xl:grid-cols-4 gap-2 xl:gap-6"
            >
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName">Full Name{!isEdit && "*"}</label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Enter the full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    />
                </div>
                {/* Father's Name */}
                <div>
                    <label htmlFor="fatherName">Father's Name{!isEdit && "*"}</label>
                    <input
                        type="text"
                        name="fatherName"
                        id="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        placeholder="Enter the father's name"
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    />
                </div>
                {/* Mother's Name */}
                <div>
                    <label htmlFor="motherName">Mother's Name{!isEdit && "*"}</label>
                    <input
                        type="text"
                        name="motherName"
                        id="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        placeholder="Enter the mother's name"
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    />
                </div>
                {/* Date of Birth */}
                <div>
                    <label htmlFor="dob">Date of Birth{!isEdit && "*"}</label>
                    <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    />
                </div>
                {/* Class */}
                <div>
                    <label htmlFor="class">Class{!isEdit && "*"}</label>
                    <input
                        type="text"
                        name="class"
                        id="class"
                        value={formData.class}
                        onChange={handleChange}
                        placeholder="Studying in class"
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    />
                </div>
                {/* Institute */}
                <div>
                    <label htmlFor="institute">Institute{!isEdit && "*"}</label>
                    <select
                        name="institute"
                        id="institute"
                        value={formData.institute}
                        onChange={handleChange}
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    >
                        <option value="" disabled>Select Institute</option>
                        {[...Object.values(Institute)].map((opt, idx) => {
                            return <option key={idx} value={opt}>{opt}</option>
                        })}
                    </select>
                </div>
                {/* Institute Name */}
                <div>
                    <label htmlFor="instituteName">Institute Name</label>
                    <input
                        type="text"
                        name="instituteName"
                        id="instituteName"
                        value={formData.instituteName}
                        onChange={handleChange}
                        placeholder="Enter the institute name"
                        className="mx-2 border-2 rounded-md px-1"
                    />
                </div>
                {/* Gender */}
                <div>
                    <label htmlFor="gender">Gender{!isEdit && "*"}</label>
                    <select
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    >
                        <option value="" disabled>Select Gender</option>
                        {[...Object.values(Gender)].map((opt, idx) => {
                            return <option key={idx} value={opt}>{opt}</option>
                        })}
                    </select>
                </div>
                {/* Category */}
                <div>
                    <label htmlFor="category">Category{!isEdit && "*"}</label>
                    <select
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    >
                        <option value="" disabled>Select Category</option>
                        {[...Object.values(Category)].map((opt, idx) => {
                            return <option key={idx} value={opt}>{opt}</option>
                        })}
                    </select>
                </div>
                {/* Mobile Number */}
                <div>
                    <label htmlFor="mobileNo">Mobile No.{!isEdit && "*"}</label>
                    <input
                        type="text"
                        name="mobileNo"
                        id="mobileNo"
                        maxLength={10}
                        value={formData.mobileNo}
                        onChange={handleChange}
                        placeholder="00000 00000"
                        className="mx-2 border-2 rounded-md px-1 w-32"
                        required={!isEdit}
                    />
                </div>
                {/* Guardian Mobile Number */}
                <div>
                    <label htmlFor="guardianMobileNo">Guardian Mobile No.{!isEdit && "*"}</label>
                    <input
                        type="text"
                        name="guardianMobileNo"
                        id="guardianMobileNo"
                        maxLength={10}
                        value={formData.guardianMobileNo}
                        onChange={handleChange}
                        placeholder="00000 00000"
                        className="mx-2 border-2 rounded-md px-1 w-32"
                        required={!isEdit}
                    />
                </div>
                {/* Email */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="mx-2 border-2 rounded-md px-1"
                    />
                </div>
                {/* Address */}
                <div>
                    <label htmlFor="address">Address{!isEdit && "*"}</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter the address"
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    />
                </div>
                {/* Course */}
                <div>
                    <label htmlFor="course">Course{!isEdit && "*"}</label>
                    <select
                        name="course"
                        id="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    >
                        <option value="" disabled>Select Course</option>
                        <option value="DCA">DCA</option>
                        <option value="PGDCA">PGDCA</option>
                        <option value="TALLY">TALLY</option>
                        <option value="TYPING">TYPING</option>
                        <option value="ENGLISHTYPING">ENGLISH TYPING</option>
                        <option value="HINDITYPING">HINDI TYPING</option>
                        <option value="BASIC01">BASIC 1 MONTH</option>
                        <option value="BASIC03">BASIC 3 MONTHS</option>
                        <option value="BASIC06">BASIC 6 MONTHS</option>
                    </select>
                </div>
                {/* Enrolled On */}
                <div>
                    <label htmlFor="enrolledOn">Enrolled On{!isEdit && "*"}</label>
                    <input
                        type="date"
                        name="enrolledOn"
                        id="enrolledOn"
                        value={formData.enrolledOn}
                        onChange={handleChange}
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    />
                </div>
                {/* Total Fees */}
                <div>
                    <label htmlFor="totalFees">Total Fees{!isEdit && "*"}</label>
                    <input
                        type="number"
                        name="totalFees"
                        id="totalFees"
                        maxLength={10}
                        value={formData.totalFees}
                        onChange={handleChange}
                        placeholder="Enter the total fees"
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    />
                </div>
                {/* Batch */}
                <div>
                    <label htmlFor="batch">Batch{!isEdit && "*"}</label>
                    <select
                        name="batch"
                        id="batch"
                        value={formData.batch}
                        onChange={handleChange}
                        className="mx-2 border-2 rounded-md px-1"
                        required={!isEdit}
                    >
                        <option value="" disabled>Select Batch</option>
                        <option value="B01T7AM">BASIC 01 TIME 7AM</option>
                        <option value="B02T8AM">BASIC 02 TIME 8AM</option>
                        <option value="B03T9AM">BASIC 03 TIME 9AM</option>
                        <option value="B04T10AM">BASIC 04 TIME 10AM</option>
                        <option value="B05T11AM">BASIC 05 TIME 11AM</option>
                        <option value="B06T12PM">BASIC 06 TIME 12PM</option>
                        <option value="B07T3PM">BASIC 07 TIME 3PM</option>
                        <option value="B08T4PM">BASIC 08 TIME 4PM</option>
                        <option value="B09T5PM">BASIC 09 TIME 5PM</option>
                        <option value="B10T6PM">BASIC 10 TIME 6PM</option>
                    </select>
                </div>
                {/* Session */}
                <div>
                    <label htmlFor="session">Session</label>
                    <input
                        type="text"
                        name="session"
                        id="session"
                        value={formData.session}
                        onChange={handleChange}
                        placeholder="JUNE 2025"
                        className="mx-2 border-2 rounded-md px-1"
                    />
                </div>
                {/* Remarks */}
                <div>
                    <label htmlFor="remarks">Remarks</label>
                    <input
                        type="text"
                        name="remarks"
                        id="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        placeholder="Enter remarks"
                        className="mx-2 border-2 rounded-md px-1"
                    />
                </div>
                {/* Buttons */}
                <div className="col-span-4 my-5">
                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-md shadow hover:cursor-pointer">Submit</button>
                    <a href="/students" className="bg-red-500 text-white px-2 py-1 rounded-md mx-2 shadow hover:cursor-pointer">Cancel</a>
                </div>
            </form>
        </>
    );
};