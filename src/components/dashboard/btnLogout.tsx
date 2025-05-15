"use client"

import { signOut } from "next-auth/react";

export default function BtnLogout() {
    return (
        <>
            <button
                onClick={() => signOut()}
                className="my-1 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white hover:cursor-pointer"
            >
                Logout
            </button>
        </>
    );
};
