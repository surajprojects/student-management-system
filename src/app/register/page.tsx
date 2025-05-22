import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Register from "@/components/home/register";

export default function RegisterPage() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="my-16 flex flex-1 items-center justify-center">
                    <Register />
                </main>
                <Footer />
            </div>
        </>
    );
};