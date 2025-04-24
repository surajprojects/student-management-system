import Table from "@/components/students/table";
import axiosInstance from "@/utils/axios";
import { UserPlusIcon } from "@heroicons/react/24/outline"

const getData = async () => {
    try {
        const result = await axiosInstance.get("/students");
        const data = result.data.allStudents;
        return data;
    } catch (error) {
        console.error("Failed to submit the form!", error);
        return [];
    }
};

export default async function Students() {
    const studentsList = await getData();
    return (
        <>
            <div>
                <div className="border-b-2 pb-2 mb-6 flex justify-between">
                    <p className="text-3xl font-medium">Students</p>
                    <a href="/students/new" className="hover:cursor-pointer rounded-full flex items-center hover:shadow">
                        <UserPlusIcon className="w-9 h-6 text-black" />
                    </a>
                </div>
                <div>
                    <Table studentsData={studentsList} />
                </div>
            </div>
        </>
    );
};