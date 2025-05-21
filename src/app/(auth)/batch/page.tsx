"use client"

import { useEffect, useState } from "react";

import BtnAddBatch from "@/components/batch/btnAddBatch";
import axiosInstance from "@/utils/axios";

import { errorHandle } from "@/utils/errors/errorHandle";
import BatchList from "@/components/batch/batchList";
import { refreshData } from "@/store/atoms/refreshData";
import { useRecoilValue } from "recoil";

export default function Batch() {
    const [batchList, setBatchList] = useState([]);
    const reloadData = useRecoilValue(refreshData);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosInstance.get("/batch");
                const data = result.data.allBatches;
                setBatchList(data);
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