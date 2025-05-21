"use client"

import { useEffect, useState } from "react";
import Table from "@/components/feestracker/table";
import axiosInstance from "@/utils/axios";
import { errorHandle } from "@/utils/errors/errorHandle";
import { useRecoilValue } from "recoil";
import { refreshData } from "@/store/atoms/refreshData";

export default function FeesTracker() {
    const [feesData, setFeesData] = useState([]);
    const reloadData = useRecoilValue(refreshData);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get("/feestracker");
                const data = result.data.studentsData;
                setFeesData(data);
            } catch (error) {
                errorHandle(error);
            }
        };
        getData();
    }, [reloadData]);

    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-5">
                    <p className="text-3xl font-medium">Fees Tracker</p>
                </div>
                <div>
                    <Table studentsFeesData={feesData} />
                </div>
            </div>
        </>
    );
};