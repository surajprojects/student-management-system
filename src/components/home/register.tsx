"use client"

import { useRouter } from "next/navigation";
import CardField from "../students/cardField";
import { ChangeEvent, FormEvent, useState } from "react";
import { Gender, Category } from "@/db/generated/prisma";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";

export default function Register() {
    const router = useRouter();
    const initialData = {
        name: "",
        fatherName: "",
        motherName: "",
        dob: "",
        gender: "",
        category: "",
        email: "",
        mobileNo: "",
        address: "",
        username: "",
        password: "",
        remarks: "",
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

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (!Object.values(Gender).includes(formData.gender as Gender)) {
            throw new Error("Invalid gender");
        }
        if (!Object.values(Category).includes(formData.category as Category)) {
            throw new Error("Invalid category");
        }

        try {
            await axiosInstance.post("/auth/register", formData);
            router.push("/");
            toast.success("User created successfully!");
        }
        catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <div className="border shadow-md p-8 rounded-lg h-2/3">
                <h3 className="text-3xl font-medium text-center mb-5">Register</h3>
                <form
                    onSubmit={handleSubmit}
                    className="h-full flex flex-col justify-around pb-6"
                >
                    {/* Name */}
                    <CardField
                        id="name"
                        title="Name"
                        textHolder="Enter the name"
                        fieldValue={formData.name}
                        onChangeFunc={handleChange}
                    />
                    {/* Father's Name */}
                    <CardField
                        id="fatherName"
                        title="Father's Name"
                        textHolder="Enter the father's name"
                        fieldValue={formData.fatherName}
                        onChangeFunc={handleChange}
                    />
                    {/* Mother's Name */}
                    <CardField
                        id="motherName"
                        title="Mother's Name"
                        textHolder="Enter the mother's name"
                        fieldValue={formData.motherName}
                        onChangeFunc={handleChange}
                    />
                    {/* Date of Birth */}
                    <CardField
                        fieldType="date"
                        id="dob"
                        title="Date of Birth"
                        isTextHolder={false}
                        fieldValue={formData.dob}
                        onChangeFunc={handleChange}
                    />
                    {/* Gender */}
                    <div>
                        <label htmlFor="gender">Gender*</label>
                        <select
                            name="gender"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mx-2 border-2 rounded-md px-1"
                        >
                            <option value="" disabled>Select Gender</option>
                            {[...Object.values(Gender)].map((opt, idx) => {
                                return <option key={idx} value={opt}>{opt}</option>
                            })}
                        </select>
                    </div>
                    {/* Category */}
                    <div>
                        <label htmlFor="category">Category*</label>
                        <select
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mx-2 border-2 rounded-md px-1"
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
                    />
                    {/* Email */}
                    <CardField
                        fieldType="email"
                        id="email"
                        title="Email"
                        textHolder="Enter email address"
                        fieldValue={formData.email}
                        onChangeFunc={handleChange}
                    />
                    {/* Address */}
                    <CardField
                        id="address"
                        title="Address"
                        textHolder="Enter the address"
                        fieldValue={formData.address}
                        onChangeFunc={handleChange}
                    />
                    {/* Username */}
                    <CardField
                        id="username"
                        title="Username"
                        textHolder="Enter the username"
                        fieldValue={formData.username}
                        onChangeFunc={handleChange}
                    />
                    {/* Password */}
                    <div>
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter the password"
                            minLength={8}
                            maxLength={32}
                            value={formData.password}
                            onChange={handleChange}
                            className="mx-2 border-2 rounded-md px-1"
                        />
                    </div>
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
                        <button type="submit" className="bg-green-500 w-full rounded-md shadow text-white py-1 hover:cursor-pointer hover:bg-green-600">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
};