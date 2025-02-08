"use client";

import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useEffect } from "react";

export default function VerifyPassReset() {
  const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('verify_reset_pass')) {
          router.push("/");
        }
    }, [router])
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="min-h-screen flex items-center justify-center mt-10 bg-gradient-to-br from-black to-gray-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-black flex flex-col items-center max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
            <Image src={"/mail-sent.svg"} width={"200"} height={"200"} alt="image-sent" />
            <h1 className="font-bold m-0">Reset You&apos;re Password</h1>
            <p>We already send reset password link to your email, please check it!</p>
        </div>
      </div>
    </>
  );
}
