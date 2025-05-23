"use client"

import { ChangeEvent, useEffect, useState } from "react";
import { Institute, Gender, Category, } from "@/db/generated/prisma";
import { StudentFormInput } from "@/utils/validators/studentInput";
import axiosInstance from "@/utils/axios";
import { errorHandle } from "@/utils/errors/errorHandle";
import CardField from "./cardField";
import Spinner from "../ui/spinner";
import { StudentData } from "@/utils/common/studentType";
import { useRouter } from "next/navigation";

export default function Card({
    handleSubmitForm,
    studentId,
    isEdit = false
}: {
    handleSubmitForm: (data: StudentFormInput, id?: string) => Promise<boolean>,
    studentId?: string,
    isEdit?: boolean
}) {
    const initialData = {
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
        remarks: "",
    };

    const router = useRouter();
    const [formData, setFormData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            const getData = async () => {
                try {
                    setIsLoading(true);
                    const result = await axiosInstance.get(`/students/${studentId}`);
                    const data: StudentData = result.data.studentData;
                    setFormData((prevData) => {
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
                            remarks: data.remarks ? data.remarks : "",
                        }
                    });
                    setIsLoading(false);
                }
                catch (error) {
                    errorHandle(error);
                }
            };
            getData();
        };
    }, [isEdit, studentId]);

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            {isLoading ?
                <Spinner />
                :
                <form
                    onSubmit={async (evt) => {
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
                        const isSuccess = await handleSubmitForm(
                            {
                                ...formData,
                                institute: formData.institute as Institute,
                                gender: formData.gender as Gender,
                                category: formData.category as Category,
                            }
                            , studentId);
                        if (isSuccess) {
                            setFormData(initialData)
                        }
                    }
                    }
                    className="grid grid-cols-1 xl:grid-cols-4 gap-2 xl:gap-6"
                >
                    {/* Full Name */}
                    <CardField
                        id="fullName"
                        title="Full Name"
                        textHolder="Enter the full name"
                        fieldValue={formData.fullName}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Father's Name */}
                    <CardField
                        id="fatherName"
                        title="Father's Name"
                        textHolder="Enter the father's name"
                        fieldValue={formData.fatherName}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Mother's Name */}
                    <CardField
                        id="motherName"
                        title="Mother's Name"
                        textHolder="Enter the mother's name"
                        fieldValue={formData.motherName}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Date of Birth */}
                    <CardField
                        fieldType="date"
                        id="dob"
                        title="Date of Birth"
                        isTextHolder={false}
                        fieldValue={formData.dob}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Class */}
                    <CardField
                        id="class"
                        title="Class"
                        textHolder="Studying in class"
                        fieldValue={formData.class}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
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
                    <CardField
                        id="instituteName"
                        title="Institute Name"
                        textHolder="Enter the institute name"
                        fieldValue={formData.instituteName}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
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
                    <CardField
                        id="mobileNo"
                        title="Mobile No."
                        textHolder="00000 00000"
                        fieldValue={formData.mobileNo}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Guardian Mobile Number */}
                    <CardField
                        id="guardianMobileNo"
                        title="Guardian Mobile No."
                        textHolder="00000 00000"
                        fieldValue={formData.guardianMobileNo}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Email */}
                    <CardField
                        fieldType="email"
                        id="email"
                        title="Email"
                        textHolder="Enter email address"
                        fieldValue={formData.email}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Address */}
                    <CardField
                        id="address"
                        title="Address"
                        textHolder="Enter the address"
                        fieldValue={formData.address}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
                    {/* Remarks */}
                    <CardField
                        id="remarks"
                        title="Remarks"
                        textHolder="Enter remarks"
                        fieldValue={formData.remarks}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Buttons */}
                    <div className="col-span-4 my-5">
                        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-md shadow hover:cursor-pointer">Submit</button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-red-500 text-white px-2 py-1 rounded-md mx-2 shadow hover:cursor-pointer"
                        >Cancel</button>
                    </div>
                </form >
            }
        </>
    );
};