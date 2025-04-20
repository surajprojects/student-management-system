import SideBar from "@/components/dashboard/sideBar";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="flex">
                <SideBar />
                <div className="flex-grow">
                    <main className="p-10">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};