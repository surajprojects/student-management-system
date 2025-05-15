import Card from "@/components/batch/batchForm";
import BatchList from "@/components/batch/batchlist";
import BtnAddBatch from "@/components/batch/btnAddBatch";

export default function FeesTracker() {
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-5 flex justify-between">
                    <p className="text-3xl font-medium">Batch</p>
                    <BtnAddBatch />
                </div>
                <div>
                    <BatchList />
                </div>
            </div>
        </>
    );
};