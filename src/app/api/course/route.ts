import prisma from "@/db";
import { courseFormInput, CourseFormInput } from "@/utils/validators/courseInput";

export async function GET() {
    try {

        // Dummy Data Only for development 
        // await prisma.course.createMany({
        //     data: [
        //         {
        //             code: "DCA",
        //             name: "Diploma in Computer Applications",
        //             instituteName: "Dikshant Institute",
        //             duration: 12,
        //             fees: 7500,
        //         },
        //         {
        //             code: "PGDCA",
        //             name: "Post Graduate Diploma in Computer Applications",
        //             instituteName: "Dikshant Institute",
        //             duration: 12,
        //             fees: 8500,
        //         },
        //         {
        //             code: "TALLY",
        //             name: "Tally",
        //             instituteName: "Dikshant Institute",
        //             duration: 4,
        //             fees: 4000,
        //         },
        //         {
        //             code: "TYPING",
        //             name: "Typing",
        //             instituteName: "Dikshant Institute",
        //             duration: 1,
        //             fees: 500,
        //         },
        //         {
        //             code: "ENGLISHTYPING",
        //             name: "English Typing",
        //             instituteName: "Dikshant Institute",
        //             duration: 1,
        //             fees: 500,
        //         },
        //         {
        //             code: "HINDITYPING",
        //             name: "Hindi Typing",
        //             instituteName: "Dikshant Institute",
        //             duration: 1,
        //             fees: 500,
        //         },
        //         {
        //             code: "BASIC01",
        //             name: "Basic Monthly",
        //             instituteName: "Dikshant Institute",
        //             duration: 1,
        //             fees: 500,
        //         },
        //         {
        //             code: "BASIC03",
        //             name: "Basic 3 Months",
        //             instituteName: "Dikshant Institute",
        //             duration: 3,
        //             fees: 1800,
        //         },
        //         {
        //             code: "BASIC06",
        //             name: "Basic 6 Months",
        //             instituteName: "Dikshant Institute",
        //             duration: 6,
        //             fees: 2500,
        //         },
        //     ],
        // });


        const allCourses = await prisma.course.findMany({ include: { students: true } });

        if (!allCourses) {
            return Response.json({ message: "Courses not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all courses!!!", allCourses }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export async function POST(req: Request) {
    try {
        const data: CourseFormInput = await req.json();
        const parsedInput = courseFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        }

        const foundCourse = await prisma.course.findUnique({ where: { code: parsedInput.data.code } });

        if (foundCourse) {
            return Response.json({ message: "Duplicate course code!!!" }, { status: 409 });
        }

        const courseData = await prisma.course.create({
            data: {
                code: parsedInput.data.code,
                name: parsedInput.data.name,
                instituteName: parsedInput.data.instituteName,
                duration: parsedInput.data.duration,
                fees: parsedInput.data.fees,
            }
        });

        return Response.json({ message: "Successfully created the course!!!", courseData }, { status: 201 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};