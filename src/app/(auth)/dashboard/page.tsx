import dynamic from 'next/dynamic';
import TotalCard from "@/components/dashboard/card";

const Chart = dynamic(
    () => import('../../../components/dashboard/chart'),
    { ssr: false }
);

export default function Dashboard() {
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-5">
                    <p className="text-3xl font-medium">Dashboard</p>
                </div>
                <div className="flex">
                    {/* Total Students Container */}
                    <TotalCard title="Total Students" colorName='86efac' />
                    {/* Total Students Fees Due Container */}
                    <TotalCard title="Total Students Fees Due" num='25' />
                    {/* Total Fees Paid Container */}
                    <TotalCard title="Total Fees Paid" num={`₹${5000}/-`} colorName="93c5fd" />
                    {/* Total Fees Due Container */}
                    <TotalCard title="Total Fees Due" num={`₹${2500}/-`} colorName="f9a8d4" />
                </div>
                <div className='w-11/12 flex'>
                    {/* Fees Chart */}
                    <div className='w-full h-[32rem]'>
                        <Chart firstName='Total Fees Paid' firstValue={25000} firstColor='0077b6' secondName='Total Fees Due' secondValue={2500} secondColor='fca311' />
                    </div>
                </div>
            </div>
        </>
    );
};