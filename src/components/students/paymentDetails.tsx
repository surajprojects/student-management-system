import { PaymentsList } from "@/utils/common/paymentType";
import ActionBtns from "./actionBtns";
import { formatDate } from "@/utils/dateAndTime";

export default function PaymentDetails({ paymentData, studentId }: { paymentData: PaymentsList, studentId: string }) {
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
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Method
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentData.length > 0 ?
                            paymentData.map((payment, idx) => {
                                return <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {idx + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {formatDate(payment.date.split("T")[0])}
                                    </td>
                                    <td className="px-6 py-4">
                                        {payment.method}
                                    </td>
                                    <td className="px-6 py-4">
                                        {payment.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ActionBtns paymentBtn={true} studentId={studentId} paymentId={payment.id} />
                                    </td>
                                </tr>
                            })
                            :
                            <tr className="h-14"><td colSpan={5} className="text-center">No payments found!!!</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};