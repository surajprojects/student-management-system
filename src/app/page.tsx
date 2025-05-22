import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Login from "@/components/home/login";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <Login />
        </main>
        <Footer />
      </div>
    </>
  );
};