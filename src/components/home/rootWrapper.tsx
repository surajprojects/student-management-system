"use client"

import { RecoilRoot } from "recoil";

export default function RootWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <RecoilRoot>
                {children}
            </RecoilRoot>
        </>
    );
};