"use client"

import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import CardField from "../students/cardField";
import { ChangeEvent, FormEvent, useState } from "react";
import { errorHandle } from "@/utils/errors/errorHandle";

export default function BatchForm({ displayForm }: { displayForm: (value: boolean) => void }) {
    const initialData = {
        code: "",
        name: "",
        time: "",
    };

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

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();
        try {
            const result = await axiosInstance.post("/batch", formData);
            if (result.status === 201) {
                displayForm(false);
                toast.success("Batch created successfully!!!");
            }
        } catch (error) {
            console.log(error)
            errorHandle(error);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="h-44 flex flex-col justify-around"
            >
                {/* Code */}
                <CardField
                    id="code"
                    title="Code"
                    textHolder="Enter the batch code"
                    fieldValue={formData.code}
                    onChangeFunc={handleChange}
                />
                {/* Name */}
                <CardField
                    id="name"
                    title="Name"
                    textHolder="Enter the batch name"
                    fieldValue={formData.name}
                    onChangeFunc={handleChange}
                />
                {/* Time */}
                <CardField
                    id="time"
                    title="Time"
                    textHolder="Enter the batch time"
                    fieldValue={formData.time}
                    onChangeFunc={handleChange}
                />
                {/* Button */}
                <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-md shadow hover:cursor-pointer">Submit</button>
            </form>
        </>
    );
};