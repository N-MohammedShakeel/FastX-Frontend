import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

import TableLayout from "../common/TableLayout";

const RecentTripsTable = ({ bookings, onView }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const trips = bookings || [];
  const itemsPerPage = 4;
  const totalPages = Math.ceil(trips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTrips = trips.slice(startIndex, startIndex + itemsPerPage);

  return (
    <TableLayout
      title="Recent Fleet Activity"
      subtitle="Real-time status of your active trips"
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      totalItems={trips.length}
      startIndex={startIndex}
      itemsPerPage={itemsPerPage}
      empty={paginatedTrips.length === 0}
    >
      <>
        <thead className="bg-slate-50/50">
          <tr className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            <th className="text-left px-8 py-4">Passenger</th>
            <th className="text-left px-5 py-4">Bus No</th>
            <th className="text-left px-6 py-4">Route</th>
            <th className="text-left px-6 py-4">Status</th>
            <th className="text-left px-6 py-4">Fare</th>
            <th className="text-left px-8 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {paginatedTrips.length > 0 ? (
            paginatedTrips.map((trip) => (
              <tr
                key={trip.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-8 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#005CAB]">
                      {trip.passengerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        {trip.passengerName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 font-semibold text-slate-700">
                  {trip.busNumber}
                </td>
                <td className="px-6 py-3">
                  <p className="font-semibold text-slate-800">{`${trip.origin} → ${trip.destination}`}</p>
                  <p className="text-xs text-slate-400">
                    Dep:{" "}
                    {new Date(trip.departureTime).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      trip.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : trip.status === "PROCESSING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {trip.status}
                  </span>
                </td>
                <td className="px-6 py-3 font-bold text-slate-900">
                  ₹{trip.totalFare}
                </td>
                <td className="px-8 py-3 flex items-center gap-2">
                  <button
                    onClick={() => onView(trip)}
                    className="px-3 h-10 rounded-xl bg-[#005CAB] text-white text-sm font-semibold hover:bg-[#004b96] transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-20 text-slate-400">
                No recent activity found.
              </td>
            </tr>
          )}
        </tbody>
      </>
    </TableLayout>
  );
};

export default RecentTripsTable;
