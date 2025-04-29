"use client"

import Table from "@/components/students/table";
import axiosInstance from "@/utils/axios";
import { UserPlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";

export default function Students() {
    const [studentsList, setStudentsList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get("/students");
                const data = result.data.allStudents;
                setStudentsList(data);
            } catch (error) {
                console.error("Failed to submit the form!", error);
            }
        };
        getData();
    }, []);
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-6 flex justify-between">
                    <p className="text-3xl font-medium">Students</p>
                    <a href="/students/new" className="hover:cursor-pointer rounded-full flex items-center hover:shadow">
                        <UserPlusIcon className="w-9 h-6 text-black" />
                    </a>
                </div>
                <div>
                    <Table studentsData={studentsList} />
                </div>
            </div>
        </>
    );
};