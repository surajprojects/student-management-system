import Link from "next/link";
import BtnLogout from "./btnLogout";

export default function SideBar() {
    return (
        <>
            <aside className="bg-gray-50 p-5 w-1/6 min-h-screen flex flex-col">
                {/* Title Container */}
                <div className="mx-4 mt-2 flex border-b-2 pb-2">
                    <p className="text-xl font-semibold">Student Management System</p>
                </div>
                {/* Wrapper Container */}
                <nav className="mx-4 mt-6 grow flex flex-col justify-between">
                    {/* Navigation Routes */}
                    <div className="flex flex-col">
                        <Link href="/dashboard" className="mb-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Dashboard</Link>
                        <Link href="/students" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Students</Link>
                        <Link href="/feestracker" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Fees Tracker</Link>
                        <Link href="/batch" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Batch</Link>
                        <Link href="/course" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Course</Link>
                        {/* <Link href="#" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Reports</Link> */}
                    </div>
                    {/* Control Settings */}
                    <div className="flex flex-col">
                        {/* <Link href="#" className="my-1 px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Settings</Link> */}
                        <BtnLogout />
                    </div>
                </nav>
            </aside>
        </>
    );
};