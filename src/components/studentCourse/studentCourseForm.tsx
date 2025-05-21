"use client"

import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import CardField from "../students/cardField";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { errorHandle } from "@/utils/errors/errorHandle";
import { refreshData } from "@/store/atoms/refreshData";
import { useSetRecoilState } from "recoil";
import { BatchData } from "@/utils/common/batchType";
import { CourseData } from "@/utils/common/courseType";
import { FeesStatus, Status } from "@/db/generated/prisma";
import Spinner from "../ui/spinner";
import { StudentCourseData } from "@/utils/common/studentCourseType";

export default function StudentCourseForm({
    studentId = "",
    studentCourseId = "",
    displayForm,
    isEdit = false
}: {
    studentId: string,
    studentCourseId?: string,
    displayForm: (value: boolean) => void,
    isEdit?: boolean
}) {
    const initialData = {
        batchCode: "",
        courseCode: "",
        enrolledOn: "",
        totalFees: "",
        session: "",
        remarks: "",
        status: "",
        feesStatus: "",
    };

    const setReloadData = useSetRecoilState(refreshData);
    const [formData, setFormData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(true);
    const [courseList, setCourseList] = useState([]);
    const [batchList, setBatchList] = useState([]);

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
                    const result = await axiosInstance.get(`students/${studentId}/studentcourse/${studentCourseId}`);
                    const data: StudentCourseData = result.data.studentCourseData;
                    setFormData((prevData) => {
                        return {
                            ...prevData,
                            batchCode: data.batch.code ? data.batch.code : "",
                            courseCode: data.course.code ? data.course.code : "",
                            enrolledOn: data.enrolledOn ? data.enrolledOn.split("T")[0] : "",
                            totalFees: data.totalFees ? String(data.totalFees) : "",
                            session: data.session ? data.session : "",
                            remarks: data.remarks ? data.remarks : "",
                            status: data.status ? data.status : "",
                            feesStatus: data.feesStatus ? data.feesStatus : "",
                        }
                    });
                }
                const courseResult = await axiosInstance.get("/course");
                const courseData = courseResult.data.allCourses;
                setCourseList(courseData);
                const batchResult = await axiosInstance.get("/batch");
                const batchData = batchResult.data.allBatches;
                setBatchList(batchData);
                setIsLoading(false);
            }
            catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [isEdit, studentCourseId, studentId]);

    const handleEditSubmit = async (evt: FormEvent) => {
        evt.preventDefault();
        try {
            const result = await axiosInstance.patch(`students/${studentId}/studentcourse/${studentCourseId}`, formData);
            if (result.status === 200) {
                displayForm(false);
                toast.success("Course updated successfully!!!");
                setReloadData((prevData) => !prevData);
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();
        try {
            const { status, feesStatus, ...newFormData } = formData;
            const result = await axiosInstance.post(`students/${studentId}/studentcourse`, newFormData);
            if (result.status === 201) {
                displayForm(false);
                toast.success("Course created successfully!!!");
                setReloadData((prevData) => !prevData);
            }
            // Just getting free from eslint warning of unused vars :)
            if (result.status === 999) {
                console.log(status + feesStatus);
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>

            {isLoading ?
                <Spinner />
                :

                <form
                    onSubmit={
                        isEdit ? handleEditSubmit : handleSubmit
                    }
                    className="h-96 flex flex-col justify-around text-black"
                >
                    {/* Batch */}
                    <div>
                        <label htmlFor="batch">Batch{!isEdit && "*"}</label>
                        <select
                            id="batch"
                            name="batchCode"
                            value={formData.batchCode}
                            onChange={handleChange}
                            className="mx-2 border-2 rounded-md px-1"
                            required={!isEdit}
                        >
                            <option value="" disabled>Select Batch</option>
                            {batchList.map((batch: BatchData, idx) => {
                                return <option key={idx} value={batch.code}>{batch.name}</option>;
                            })}
                        </select>
                    </div>
                    {/* Course */}
                    <div>
                        <label htmlFor="course">Course{!isEdit && "*"}</label>
                        <select
                            id="course"
                            name="courseCode"
                            value={formData.courseCode}
                            onChange={handleChange}
                            className="mx-2 border-2 rounded-md px-1"
                            required={!isEdit}
                        >
                            <option value="" disabled>Select Course</option>
                            {courseList.map((course: CourseData, idx) => {
                                return <option key={idx} value={course.code}>{course.name}</option>;
                            })}
                        </select>
                    </div>
                    {/* Enrolled On */}
                    <CardField
                        fieldType="date"
                        id="enrolledOn"
                        title="Enrolled On"
                        isTextHolder={false}
                        fieldValue={formData.enrolledOn}
                        onChangeFunc={handleChange}
                        isRequired={!isEdit}
                    />
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
                    {/* Session */}
                    <CardField
                        id="session"
                        title="Session"
                        textHolder="JUNE 2025"
                        fieldValue={formData.session}
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
                    {/* Status and Fees Status */}
                    {isEdit &&
                        <>
                            <div>
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mx-2 border-2 rounded-md px-1"
                                >
                                    <option value="" disabled>Select Status</option>
                                    {[...Object.values(Status)].map((opt, idx) => {
                                        return <option key={idx} value={opt}>{opt}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="feesStatus">Fees Status</label>
                                <select
                                    id="feesStatus"
                                    name="feesStatus"
                                    value={formData.feesStatus}
                                    onChange={handleChange}
                                    className="mx-2 border-2 rounded-md px-1"
                                >
                                    <option value="" disabled>Select Status</option>
                                    {[...Object.values(FeesStatus)].map((opt, idx) => {
                                        return <option key={idx} value={opt}>{opt}</option>
                                    })}
                                </select>
                            </div>
                        </>
                    }
                    {/* Button */}
                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-md shadow hover:cursor-pointer">Submit</button>
                </form >
            }
        </>
    );
};