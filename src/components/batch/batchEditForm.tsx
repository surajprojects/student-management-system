"use client"

import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import CardField from "../students/cardField";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { errorHandle } from "@/utils/errors/errorHandle";

export default function BatchEditForm({ batchId = "", displayForm, initialData = {
    code: "",
    name: "",
    time: "",
} }: {
    batchId: string,
    displayForm: (value: boolean) => void,
    initialData?: {
        code: string,
        name: string,
        time: string,
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
                const result = await axiosInstance.get(`/batch/${batchId}`);
                const data = result.data.batchData;
                setFormData((prevData) => {
                    return {
                        ...prevData,
                        code: data.code,
                        name: data.name,
                        time: data.time,
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
            const result = await axiosInstance.patch(`/batch/${batchId}`, formData);
            if (result.status === 200) {
                displayForm(false);
                toast.success("Batch updated successfully!!!");
            }
        } catch (error) {
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