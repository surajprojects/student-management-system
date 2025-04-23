import Table from "@/components/students/table";

export default function Students() {
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-6">
                    <p className="text-3xl font-medium">Students</p>
                </div>
                <div>
                    <Table />
                </div>
            </div>
        </>
    );
};