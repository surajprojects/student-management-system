"use client"

import CourseList from "@/components/course/courseList";
import BtnAddCourse from "@/components/course/btnAddCourse";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

export default function Course() {
    const [courseList, setCourseList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get("/course");
                const data = result.data.allCourses;
                setCourseList(data);
            } catch (error) {
                console.error("Failed to submit the form!", error);
            }
        };
        getData();
    }, []);
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-5 flex justify-between">
                    <p className="text-3xl font-medium">Course</p>
                    <BtnAddCourse />
                </div>
                <div>
                    <CourseList courseData={courseList} />
                </div>
            </div>
        </>
    );
};