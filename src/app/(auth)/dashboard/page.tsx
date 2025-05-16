"use client"

import dynamic from 'next/dynamic';
import TotalCard from "@/components/dashboard/card";
import { useEffect, useState } from 'react';
import { errorHandle } from '@/utils/errors/errorHandle';
import axiosInstance from '@/utils/axios';

const Chart = dynamic(
    () => import('../../../components/dashboard/chart'),
    { ssr: false }
);

export default function Dashboard() {
    const [data, setData] = useState({
        totalFeesDue: 0,
        totalFeesPaid: 0,
        totalStudents: 0,
        totalStudentsFeesDue: 0,
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get("/dashboard");
                const data = result.data.dashboardData;
                setData((prevData) => {
                    return {
                        ...prevData,
                        totalStudents: data.totalStudents,
                        totalFeesPaid: data.totalFeesPaid,
                        totalFeesDue: data.totalFees - data.totalFeesPaid,
                        totalStudentsFeesDue: data.totalStudentsFeesDue,
                    }
                });
            } catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [])

    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-5">
                    <p className="text-3xl font-medium">Dashboard</p>
                </div>
                <div className="flex">
                    {/* Total Students Container */}
                    <TotalCard title="Total Students" colorName='86efac' num={`${data.totalStudents}`} />
                    {/* Total Students Fees Due Container */}
                    <TotalCard title="Total Students Fees Due" num={`${data.totalStudentsFeesDue}`} />
                    {/* Total Fees Paid Container */}
                    <TotalCard title="Total Fees Paid" num={`₹${data.totalFeesPaid}/-`} colorName="93c5fd" />
                    {/* Total Fees Due Container */}
                    <TotalCard title="Total Fees Due" num={`₹${data.totalFeesDue}/-`} colorName="f9a8d4" />
                </div>
                <div className='w-11/12 flex'>
                    {/* Fees Chart */}
                    <div className='w-full h-[32rem]'>
                        <Chart firstName='Total Fees Paid' firstValue={data.totalFeesPaid} firstColor='0077b6' secondName='Total Fees Due' secondValue={data.totalFeesDue} secondColor='fca311' />
                    </div>
                </div>
            </div>
        </>
    );
};