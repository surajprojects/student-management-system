"use client"

import { useEffect, useState } from "react";

import BtnAddBatch from "@/components/batch/btnAddBatch";
import axiosInstance from "@/utils/axios";
import BatchList from "@/components/batch/batchList";

export default function Batch() {
    const [batchList, setBatchList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get("/batch");
                const data = result.data.allBatches;
                setBatchList(data);
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
                    <p className="text-3xl font-medium">Batch</p>
                    <BtnAddBatch />
                </div>
                <div>
                    <BatchList batchData={batchList} />
                </div>
            </div>
        </>
    );
};