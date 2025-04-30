import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>Home</p>
        <Link href="/dashboard" className="m-5 shadow-md border px-3 py-1 rounded-md hover:cursor-pointer">Dashboard</Link>
      </div>
    </>
  );
};