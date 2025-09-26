"use client"

import Spinner from "../ui/spinner";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import CardField from "../students/cardField";
import { errorHandle } from "@/utils/errors/errorHandle";
import { ChangeEvent, useEffect, useState } from "react";
import { DocumentType, Institute } from "@/db/generated/prisma";
import { StudentDocumentData } from "@/utils/common/studentDocumentType";
import { StudentDocumentInput, StudentDocumentInputEdit } from "@/utils/validators/studentDocumentInput";

export default function StudentDocumentForm({
    handleSubmitForm,
    handleEditSubmitForm,
    studentId = "",
    studentDocumentId = "",
    isEdit = false,
}: {
    handleSubmitForm?: (data: StudentDocumentInput, studentId?: string) => Promise<boolean>,
    handleEditSubmitForm?: (data: StudentDocumentInputEdit, studentId?: string, studentDocumentId?: string) => Promise<boolean>,
    studentId: string,
    studentDocumentId?: string,
    isEdit?: boolean,
}) {
    const initialData = {
        documentType: "",
        documentName: "",
        institute: "",
        instituteName: "",
        idNo: "",
        rollNo: "",
        enrollmentNo: "",
        passingSession: "",
        obtainedMarks: 0,
        totalMarks: 0,
        documentLink: "",
    };

    const router = useRouter();
    const [formData, setFormData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                if (isEdit) {
                    const result = await axiosInstance.get(`students/${studentId}/studentdocument/${studentDocumentId}`);
                    const data: StudentDocumentData = result.data.studentDocumentData;
                    setFormData((prevData) => {
                        return {
                            ...prevData,
                            documentType: data.documentType ? data.documentType : "",
                            documentName: data.documentName ? data.documentName : "",
                            institute: data.institute ? data.institute : "",
                            instituteName: data.instituteName ? data.instituteName : "",
                            idNo: data.idNo ? data.idNo : "",
                            rollNo: data.rollNo ? data.rollNo : "",
                            enrollmentNo: data.enrollmentNo ? data.enrollmentNo : "",
                            passingSession: data.passingSession ? data.passingSession : "",
                            obtainedMarks: data.obtainedMarks ? data.obtainedMarks : 0,
                            totalMarks: data.totalMarks ? data.totalMarks : 0,
                            documentLink: data.documentLink ? data.documentLink : "",
                        }
                    });
                }

                setIsLoading(false);
            }
            catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [isEdit, studentDocumentId, studentId]);

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
                        if (!Object.values(DocumentType).includes(formData.documentType as DocumentType)) {
                            throw new Error("Invalid document type");
                        }
                        if (isEdit && handleEditSubmitForm) {
                            const isSuccess = await handleEditSubmitForm(
                                {
                                    ...formData,
                                    institute: formData.institute as Institute,
                                    documentType: formData.documentType as DocumentType,
                                    obtainedMarks: Number(formData.obtainedMarks),
                                    totalMarks: Number(formData.totalMarks),
                                }
                                , studentId, studentDocumentId);
                            if (isSuccess) {
                                setFormData(initialData)
                            }
                        }
                        else {
                            if (handleSubmitForm) {
                                const isSuccess = await handleSubmitForm(
                                    {
                                        ...formData,
                                        institute: formData.institute as Institute,
                                        documentType: formData.documentType as DocumentType,
                                        obtainedMarks: Number(formData.obtainedMarks),
                                        totalMarks: Number(formData.totalMarks),
                                    }
                                    , studentId);
                                if (isSuccess) {
                                    setFormData(initialData)
                                }
                            }
                        }
                    }
                    }
                    className="grid grid-cols-1 xl:grid-cols-4 gap-2 xl:gap-6"
                >
                    {/* Document Type */}
                    <div>
                        <label htmlFor="documentType">Document Type{!isEdit && "*"}</label>
                        <select
                            id="documentType"
                            name="documentType"
                            value={formData.documentType}
                            onChange={handleChange}
                            className="mx-2 border-2 rounded-md px-1"
                            required={!isEdit}
                        >
                            <option value="" disabled>Select Document</option>
                            {[...Object.values(DocumentType)].map((opt, idx) => {
                                return <option key={idx} value={opt}>{opt}</option>
                            })}
                        </select>
                    </div>
                    {/* Document Name */}
                    <CardField
                        id="documentName"
                        title="Document Name"
                        textHolder="Enter Document Name"
                        fieldValue={formData.documentName}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Institute */}
                    <div>
                        <label htmlFor="institute">Institute{!isEdit && "*"}</label>
                        <select
                            id="institute"
                            name="institute"
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
                        textHolder="Enter Institute Name"
                        fieldValue={formData.instituteName}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Id Number */}
                    <CardField
                        id="idNo"
                        title="Id No."
                        textHolder="123456"
                        fieldValue={formData.idNo}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Roll Number */}
                    <CardField
                        id="rollNo"
                        title="Roll No."
                        textHolder="123456"
                        fieldValue={formData.rollNo}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Enrollment Number */}
                    <CardField
                        id="enrollmentNo"
                        title="Enrollment No."
                        textHolder="ABC123456"
                        fieldValue={formData.enrollmentNo}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Passing Session */}
                    <CardField
                        id="passingSession"
                        title="Passing Session"
                        textHolder="JUNE 2025"
                        fieldValue={formData.passingSession}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Obtained Marks */}
                    <div>
                        <label htmlFor="obtainedMarks">Obtained Marks</label>
                        <input
                            type="number"
                            name="obtainedMarks"
                            id="obtainedMarks"
                            maxLength={10}
                            value={formData.obtainedMarks}
                            onChange={handleChange}
                            placeholder="Enter the obtained marks"
                            className="mx-2 border-2 rounded-md px-1"
                            required={false}
                        />
                    </div>
                    {/* Total Marks */}
                    <div>
                        <label htmlFor="totalMarks">Total Marks</label>
                        <input
                            type="number"
                            name="totalMarks"
                            id="totalMarks"
                            maxLength={10}
                            value={formData.totalMarks}
                            onChange={handleChange}
                            placeholder="Enter the total marks"
                            className="mx-2 border-2 rounded-md px-1"
                            required={false}
                        />
                    </div>
                    {/* Document Link */}
                    <CardField
                        id="documentLink"
                        title="Document Link"
                        textHolder="Enter Document Link"
                        fieldValue={formData.documentLink}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {/* Buttons */}
                    <div className="col-span-4 my-3">
                        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-md shadow hover:cursor-pointer">Submit</button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-red-500 text-white px-2 py-1 rounded-md mx-4 shadow hover:cursor-pointer"
                        >Cancel</button>
                    </div>
                </form >
            }
        </>
    );
};