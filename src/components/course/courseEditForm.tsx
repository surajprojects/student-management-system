"use client"

import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import CardField from "../students/cardField";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { errorHandle } from "@/utils/errors/errorHandle";

export default function CourseEditForm({
    courseId = "",
    displayForm,
    initialData = {
        code: "",
        name: "",
        instituteName: "",
        duration: "",
        fees: "",
    }, }: {
        courseId: string,
        displayForm: (value: boolean) => void,
        initialData?: {
            code: string,
            name: string,
            instituteName: string,
            duration: string,
            fees: string,
        },
    }) {

    const [formData, setFormData] = useState(initialData);

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
                const result = await axiosInstance.get(`/course/${courseId}`);
                const data = result.data.courseData;
                setFormData((prevData) => {
                    return {
                        ...prevData,
                        code: data.code,
                        name: data.name,
                        instituteName: data.instituteName,
                        duration: data.duration,
                        fees: data.fees,
                    }
                });
            } catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, []);

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();
        try {
            const result = await axiosInstance.patch(`/course/${courseId}`, {
                ...formData,
                fees: Number(formData.fees)
            });
            if (result.status === 200) {
                displayForm(false);
                toast.success("Course updated successfully!!!");
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="h-56 flex flex-col justify-around text-black"
            >
                {/* Code */}
                <CardField
                    id="code"
                    title="Code"
                    textHolder="Enter the course code"
                    fieldValue={formData.code}
                    onChangeFunc={handleChange}
                />
                {/* Name */}
                <CardField
                    id="name"
                    title="Name"
                    textHolder="Enter the course name"
                    fieldValue={formData.name}
                    onChangeFunc={handleChange}
                />
                {/* Institute Name */}
                <CardField
                    id="instituteName"
                    title="Institute Name"
                    textHolder="Enter the course institute name"
                    fieldValue={formData.instituteName}
                    onChangeFunc={handleChange}
                />
                {/* Duration */}
                <CardField
                    id="duration"
                    title="Duration"
                    textHolder="Enter the course duration"
                    fieldValue={formData.duration}
                    onChangeFunc={handleChange}
                />
                {/* Fees */}
                <div>
                    <label htmlFor="fees" className="text-black">Fees*</label>
                    <input
                        type="number"
                        name="fees"
                        id="fees"
                        maxLength={10}
                        value={formData.fees}
                        onChange={handleChange}
                        placeholder="Enter the course fees"
                        className="mx-2 border-2 rounded-md px-1 text-black"
                        required
                    />
                </div>
                {/* Button */}
                <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-md shadow hover:cursor-pointer">Submit</button>
            </form>
        </>
    );
};