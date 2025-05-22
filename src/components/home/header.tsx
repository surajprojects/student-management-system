import Link from "next/link";

export default function Header() {
    return (
        <>
            <header>
                <nav className="w-full py-6 sm:py-8 px-8 sm:px-16 lg:px-28 font-semibold flex justify-between">
                    <div className="text-xl sm:text-2xl whitespace-nowrap shrink mr-2 sm:mr-0">
                        <a href="/">Student Management System</a>
                    </div>
                    <ul className="w-1/3 py-1 px-2 flex justify-between">
                        <li>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link href="/students">Students</Link>
                        </li>
                        <li>
                            <Link href="/feestracker">Fees Tracker</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};