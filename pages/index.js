"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const BookingPage = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [about, setAbout] = useState("");
    const [bookedTimes, setBookedTimes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined" && date) {
            fetchBookedTimes(date);
        }
    }, [date]);

    const fetchBookedTimes = async (selectedDate) => {
        try {
            const response = await axios.get(`https://booking-app-api-0l78.onrender.com/api/bookings`);
            const bookings = response.data.bookings.filter(
                (booking) => booking.date === selectedDate
            );
            setBookedTimes(bookings.map((booking) => booking.time));
        } catch (error) {
            console.error("Error fetching booked times:", error);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        const newBooking = { date, time, guests, name, contact, about };

        try {
            await axios.post(`https://booking-app-api-0l78.onrender.com/api/bookings`, newBooking);
            router.push({
                pathname: "/success",
                query: newBooking,
            });
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    const getAvailableTimes = () => {
        const today = new Date();
        const selectedDate = new Date(date);

        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();

        return Array.from({ length: 24 }, (_, hour) =>
            [`${hour}:00`, `${hour}:30`].filter((slot) => {
                if (selectedDate.toDateString() === today.toDateString()) {
                    const [slotHour, slotMinute] = slot.split(":").map(Number);
                    if (slotHour < currentHour || (slotHour === currentHour && slotMinute <= currentMinute)) {
                        return false;
                    }
                }
                return true;
            })
        ).flat();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-green-500 flex items-center justify-center">
            <div className="p-8 max-w-lg w-full bg-white shadow-2xl rounded-xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Book a Table
                </h2>
                <form onSubmit={handleBooking}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min={new Date().toISOString().split("T")[0]}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Time
                        </label>
                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select Time</option>
                            {getAvailableTimes().map((slot) => (
                                <option
                                    key={slot}
                                    value={slot}
                                    disabled={bookedTimes.includes(slot)}
                                    style={{
                                        color: bookedTimes.includes(slot) ? "grey" : "black",
                                    }}
                                >
                                    {slot}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Guests
                        </label>
                        <input
                            type="number"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Contact
                        </label>
                        <input
                            type="number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            About
                        </label>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="3"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:opacity-90 transition duration-200"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
