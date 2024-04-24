"use client";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaMobileAlt } from "react-icons/fa";

export const tailwindToast = (msg1: string, msg2: string) => {
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <FaMobileAlt className="rounded" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{msg1}</p>
            <p className="mt-1 text-sm text-gray-500">{msg2}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  ));
};
const Mobiletoast = () => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      const timeoutId = setTimeout(() => {
        // toast.custom((t) => (
        //   <div
        //     className={`${
        //       t.visible ? "animate-enter" : "animate-leave"
        //     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        //   >
        //     <div className="flex-1 w-0 p-4">
        //       <div className="flex items-start">
        //         <div className="flex-shrink-0 pt-0.5">
        //           <FaMobileAlt className="rounded" />
        //         </div>
        //         <div className="ml-3 flex-1">
        //           <p className="text-sm font-medium text-gray-900">
        //             For Mobile device Users
        //           </p>
        //           <p className="mt-1 text-sm text-gray-500">
        //             Click on title of the issues for edit and delete !
        //           </p>
        //         </div>
        //       </div>
        //     </div>
        //     <div className="flex border-l border-gray-200">
        //       <button
        //         onClick={() => toast.dismiss(t.id)}
        //         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //       >
        //         Close
        //       </button>
        //     </div>
        //   </div>
        // ));
        tailwindToast(
          "For Mobile device Users",
          "Click on title of the issues for edit and delete !"
        );
      }, 1000);

      // Cancel the timeout if needed
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      // It's not a mobile device (desktop or tablet)
    }
  }, []);

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};
export const dynamic = "force-dynamic";

export default Mobiletoast;
