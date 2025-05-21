"use client"

import CourseList from "@/components/course/courseList";
import BtnAddCourse from "@/components/course/btnAddCourse";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { errorHandle } from "@/utils/errors/errorHandle";
import { refreshData } from "@/store/atoms/refreshData";
import { useRecoilValue } from "recoil";

export default function Course() {
    const reloadData = useRecoilValue(refreshData);
    const [courseList, setCourseList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get("/course");
                const data = result.data.allCourses;
                setCourseList(data);
            } catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [reloadData]);
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