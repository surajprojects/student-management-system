"use client"

import ContactForm from "@/components/home/contactForm";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import { errorHandle } from "@/utils/errors/errorHandle";
import { useRouter } from "next/navigation";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";

interface contactFormType {
    name: string,
    email: string,
    message: string,
}

export default function Contact() {
    const router = useRouter();
    const handleSubmit = async (formData: contactFormType) => {
        try {
            await axiosInstance.post("/contact", formData);
            router.push("/");
            toast.success("Successfully received the message!!!");
        }
        catch (error) {
            errorHandle(error);
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="my-16 flex flex-1 items-center justify-center">
                    <div className="w-full px-4 sm:px-20 md:px-32 xl:px-60 2xl:px-96">
                        <ContactForm handleSubmitForm={handleSubmit} />
                    </div>
                </main>
                <Footer />
            </div>

        </>
    );
};