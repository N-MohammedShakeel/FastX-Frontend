import React, { useEffect, useState } from "react";
import { FaWallet, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import SearchWidget from "../../components/passenger/searchWidget";
import WalletD1 from "../../components/passenger/WalletD1";
import PromoBanner from "../../components/passenger/PromoBanner";
import { PassengerSidebarContent } from "../../components/passenger/PassengerSidebarContent";
import {
  getProfile,
  getPassengerBookings,
} from "../../services/passengerService";
import TicketDetailsModal from "../../components/passenger/TicketDetailsModal ";

const notifications = [
  {
    id: 1,
    title: "Booking Confirmed",
    message: "Your trip is confirmed",
    time: "2 min ago",
    icon: "fa-check",
    bg: "bg-green-100",
    color: "text-green-700",
  },
  {
    id: 2,
    title: "Refund Processed",
    message: "Refund of ₹899 has been processed",
    time: "1 hour ago",
    icon: "fa-indian-rupee-sign",
    bg: "bg-blue-100",
    color: "text-blue-700",
  },
  {
    id: 3,
    title: "Reminder",
    message: "Trip tomorrow",
    time: "Yesterday",
    icon: "fa-bell",
    bg: "bg-orange-100",
    color: "text-orange-700",
  },
];

export default function PassengerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsPerPage = 2;

  const totalPages = Math.ceil(trips.length / bookingsPerPage);
  const startIndex = (currentPage - 1) * bookingsPerPage;
  const endIndex = startIndex + bookingsPerPage;
  const paginatedTrips = trips.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        const profileResponse = await getProfile();
        const bookingResponse = await getPassengerBookings();

        setProfile(profileResponse.data);
        setTrips(bookingResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPassengerData();
  }, []);

  const upcomingTrip = trips
    ?.filter(
      (trip) =>
        trip.status === "CONFIRMED" &&
        new Date(trip.departureTime) > new Date(),
    )
    .sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime))[0];

  const handleViewTicket = (booking) => {
    setSelectedBooking(booking);
    setIsTicketOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F9]">
      <Navbar />

      <div className="lg:hidden flex items-center justify-between px-4 py-3 mt-5">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col gap-1"
        >
          <span className="w-8 h-1 bg-[#005CAB]"></span>
          <span className="w-6 h-1 bg-[#005CAB]"></span>
          <span className="w-8 h-1 bg-[#005CAB]"></span>
        </button>

        <div className="w-5"></div>
      </div>

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <PassengerSidebarContent onClose={() => setIsSidebarOpen(false)} />
        </Sidebar>

        <main className="flex-1 p-6 lg:p-10 space-y-10">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Welcome back, {profile?.name || "Passenger"}!
              </h2>
              <p className="text-slate-500 mt-1">
                Your next adventure is just a click away. Where to next?
              </p>
            </div>

            <WalletD1 balance={profile?.wallet} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SearchWidget />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex justify-between mb-4">
                <h3 className="text-2xl font-bold">Notifications</h3>
                <span className="text-[#005CAB] text-md font-bold">
                  Clear all
                </span>
              </div>

              <div className="space-y-4 text-sm">
                {notifications.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${item.bg}`}
                    >
                      <i
                        className={`fa-solid ${item.icon} text-xl font-bold ${item.color}`}
                      ></i>
                    </div>

                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-slate-500">{item.message}</p>
                      <p className="text-xs text-slate-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-[#005CAB] rounded-xl transform rotate-[1.5deg]" />

              <div className="relative bg-white rounded-xl shadow-xl p-6 flex flex-col justify-between h-full space-y-6">
                {upcomingTrip ? (
                  <>
                    <div className="space-y-4">
                      <span className="bg-[#D5E3FF] text-[#001C3B] text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                        Upcoming
                      </span>

                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-extrabold text-[#1B1C1C]">
                            {upcomingTrip.origin} → {upcomingTrip.destination}
                          </h3>

                          <p className="text-sm text-[#525F71]">
                            {new Date(
                              upcomingTrip.departureTime,
                            ).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-extrabold text-[#005CAB]">
                            ₹{upcomingTrip.totalFare}
                          </div>

                          <div className="text-xs font-semibold text-[#525F71]">
                            Total Fare
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-slate-200 py-4 flex items-center gap-4">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D3E1F6] border-2 border-white text-[10px] font-bold text-[#005CAB]">
                          FX
                        </div>

                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D3E1F6] border-2 border-white text-[10px] font-bold text-[#005CAB]">
                          {upcomingTrip.totalNoOfSeats}
                        </div>
                      </div>

                      <p className="text-xs text-[#525F71]">
                        Coach {upcomingTrip.busNumber} • Seat{" "}
                        {upcomingTrip.seatNumbers?.join(", ")}
                      </p>
                    </div>

                    <button
                      onClick={() => handleViewTicket(upcomingTrip)}
                      className="flex items-center justify-center gap-2 border-2 border-[#005CAB] text-[#005CAB] font-bold rounded-xl h-12 hover:bg-[#005CAB] hover:text-white transition"
                    >
                      View Ticket
                      <FaArrowRight className="text-xs" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <i className="fa-solid fa-ticket text-4xl text-slate-300"></i>

                    <p className="mt-4 font-bold text-slate-700">
                      No upcoming trips
                    </p>

                    <p className="text-sm text-slate-500">
                      Your next journey will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md flex flex-col">
              <div className="flex justify-between mb-4">
                <h3 className="font-bold text-xl">Recent Bookings</h3>
                <span className="text-[#005CAB] text-md font-bold">
                  See All History
                </span>
              </div>
              <div className="overflow-y-auto max-h-80">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase text-slate-500">
                    <tr>
                      <th className="py-2 text-left font-black">Bus Details</th>
                      <th className="text-left font-black">Booking Date</th>
                      <th className="text-left font-black">Status</th>
                      <th className="text-right font-black">Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedTrips.length > 0 ? (
                      paginatedTrips.map((trip) => (
                        <tr
                          className="cursor-pointer hover:bg-slate-50 transition"
                          onClick={() => handleViewTicket(trip)}
                          key={trip.bookingId}
                        >
                          <td className="py-3 font-bold">
                            {trip.busName}
                            <br />

                            <span className="text-xs text-slate-400">
                              {trip.busNumber}
                            </span>
                          </td>

                          <td className="text-slate-600 font-medium">
                            {new Date(trip.bookingTime).toLocaleDateString(
                              "en-IN",
                              {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              },
                            )}
                          </td>

                          <td
                            className={`text-sm font-semibold ${
                              trip.status === "CONFIRMED"
                                ? "text-green-600"
                                : "text-red-700"
                            }`}
                          >
                            <p
                              className={`rounded-full inline px-2 ${
                                trip.status === "CONFIRMED"
                                  ? "bg-green-200"
                                  : "bg-red-200"
                              }`}
                            >
                              {trip.status}
                            </p>
                          </td>

                          <td className="text-right font-bold">
                            ₹{trip.totalFare.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-10 text-slate-400 font-medium"
                        >
                          No bookings found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center items-center gap-3 mt-5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#005CAB] text-white"
                  }`}
                >
                  Previous
                </button>

                <span className="text-sm font-semibold text-slate-600">
                  Page {currentPage} of {totalPages || 1}
                </span>

                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    currentPage === totalPages || totalPages === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#005CAB] text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <PromoBanner />
        </main>
      </div>

      <TicketDetailsModal
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
}
