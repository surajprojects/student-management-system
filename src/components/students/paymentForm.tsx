"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import CardField from "./cardField";
import axiosInstance from "@/utils/axios";
import { errorHandle } from "@/utils/errors/errorHandle";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { refreshData } from "@/store/atoms/refreshData";

export default function PaymentForm({
    studentId = "",
    studentCourseId = "",
    displayForm
}:
    {
        studentId: string,
        studentCourseId: string,
        displayForm: (value: boolean) => void
    }) {
    const [formData, setFormData] = useState({
        method: "",
        amount: "",
        date: "",
    });

    const setReloadData = useSetRecoilState(refreshData);

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
            const result = await axiosInstance.post(`/students/${studentId}/studentcourse/${studentCourseId}/payment`, {
                method: formData.method,
                amount: Number(formData.amount),
                date: formData.date,
            });
            if (result.status === 200) {
                displayForm(false);
                toast.success('Payment saved successfully!');
                setReloadData((prevData) => !prevData);
            }
        } catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* Payment Method */}
                <div>
                    <label htmlFor="method" className="text-black">Payment Method</label>
                    <select
                        name="method"
                        id="method"
                        value={formData.method}
                        onChange={handleChange}
                        className="mb-4 mx-2 border-2 rounded-md px-1 text-black"
                    >
                        <option value="" disabled>Select Method</option>
                        <option value="CASH">CASH</option>
                        <option value="UPI">UPI</option>
                        <option value="PHONEPAY">PHONEPAY</option>
                        <option value="GOOGLEPAY">GOOGLEPAY</option>
                    </select>
                </div>
                {/* Amount */}
                <div>
                    <label htmlFor="amount" className="text-black">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Enter the amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="mb-4 border-2 mx-2 rounded-md px-1 text-black"
                        required
                    />
                </div>
                {/* Date of Payment */}
                <CardField
                    fieldType="date"
                    id="date"
                    title="Date"
                    isTextHolder={false}
                    fieldValue={formData.date}
                    onChangeFunc={handleChange}
                />
                {/* Button */}
                <button type="submit" className="w-full mt-4 bg-green-500 text-white px-2 py-1 rounded-md shadow hover:cursor-pointer">Add Payment</button>
            </form>
        </>
    );
};