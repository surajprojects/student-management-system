import { BatchesList } from "@/utils/common/batchType";
import BatchActionBtns from "./batchActionBtns";

export default function BatchList({ batchData }: { batchData: BatchesList }) {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {batchData.length > 0 ?
                            batchData.map((batch, idx: number) => {
                                return <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <td className="px-6 py-4">
                                        {idx + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        {batch.code}
                                    </td>
                                    <td className="px-6 py-4">
                                        {batch.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {batch.time}
                                    </td>
                                    <td className="px-6 py-4">
                                        <BatchActionBtns batchId={batch.id} />
                                    </td>
                                </tr>
                            })
                            :
                            <tr className="h-14"><td colSpan={5} className="text-center">No batch found!!!</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};
