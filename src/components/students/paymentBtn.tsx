"use client";

import { useState } from "react";
import PaymentForm from "./paymentForm";
import { CurrencyRupeeIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function PaymentBtn({ studentId = "" }: { studentId: string }) {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <button onClick={() => setShowForm(true)} className="hover:text-green-500">
                <CurrencyRupeeIcon className="w-6 h-6 mx-2" />
            </button>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                        >
                            <XMarkIcon className="h-5 w-5 bg-gray-50 rounded-full" />
                        </button>

                        <div className="border-b-2 pb-2 mb-5">
                            <p className="text-2xl font-semibold text-black">Add Payment</p>
                        </div>
                        <PaymentForm studentId={studentId} displayForm={setShowForm} />
                    </div>
                </div>
            )}
        </>
    );
}
