"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
    const initialData = {
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialData);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
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
        const result = await signIn("credentials", {
            redirect: false,
            username: formData.username,
            password: formData.password,
        });
        setFormData(initialData);
        if (result?.error) {
            toast.error("Invalid username or password!!!");
        } else {
            toast.success("Login successful!!!");
            window.location.href = "/dashboard";
        }
    };

    return (
        <>
            <div className="border shadow-md p-8 rounded-lg">
                <h3 className="text-3xl font-medium text-center mb-5">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border-2 rounded-md px-1 my-1"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border-2 rounded-md px-1 my-1"
                        />
                    </div>
                    <div>
                        <button type="submit" className="bg-green-500 w-full rounded-md text-white py-1 hover:cursor-pointer hover:bg-green-600">Login</button>
                        <p className="text-center mt-3">New here?<Link href="/register" className="ml-1 text-blue-600 hover:cursor-pointer hover:text-blue-700">Register</Link></p>
                    </div>
                </form>
            </div>
        </>
    );
};