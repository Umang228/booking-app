"use client";
import Link from "next/link";
import { useRouter } from "next/router";

const SuccessPage = () => {
    const router = useRouter();
    const { query } = router;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gradientStart to-gradientEnd text-white">
            <div className="p-8 max-w-lg bg-white shadow-lg rounded-lg text-center text-gray-800">
                <h2 className="text-3xl font-extrabold text-green-500 mb-4">Booking Successful!</h2>
                <p className="text-lg mb-6">
                    Thank you for your booking. Here are your booking details:
                </p>
                <div className="bg-gray-50 shadow-md p-4 rounded-lg text-left mb-6">
                    <p className="mb-2">
                        <span className="font-semibold">Name:</span> {query.name || "John Doe"}
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold">Date:</span> {query.date || "N/A"}
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold">Time:</span> {query.time || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">About:</span> {query.about || "N/A"}
                    </p>
                </div>
                <Link href="/">
                    <button className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                        Go Back to Booking Page
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
