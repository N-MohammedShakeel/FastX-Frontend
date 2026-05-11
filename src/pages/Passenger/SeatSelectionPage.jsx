import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import BackButton from "../../components/common/BackButton";
import { Legend } from "../../components/passenger/SeatSelectionComponents/Legend";
import { BusLayout } from "../../components/passenger/SeatSelectionComponents/BusLayout";
import { SeatSelectionSummary } from "../../components/passenger/SeatSelectionComponents/SeatSelectionSummary";
import { getAvailableSeats } from "../../services/passengerService";

export default function SeatSelectionPage() {
  const { busId } = useParams();
  const location = useLocation();

  const busData = location.state;

  const [selected, setSelected] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);

        const response = await getAvailableSeats(busId);
        const availableSeats = response.data || [];
        const generatedSeats = [];
        const totalSeats = busData?.noOfSeats || 40;

        for (let i = 1; i <= totalSeats; i++) {
          generatedSeats.push({
            id: i,
            type: busData?.sleeper ? "sleeper" : "seater",
            status: availableSeats.includes(i) ? "available" : "booked",
          });

          if (i % 4 === 2) {
            generatedSeats.push(null);
          }
        }

        setSeats(generatedSeats);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [busId]);

  const handleSelect = (id) => {
    const clickedSeat = seats.find((s) => s?.id === id);

    if (clickedSeat?.status === "booked") {
      return;
    }

    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-[#005CAB] border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-slate-500">Loading seats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F9]">
      <Navbar />

      <div className="p-6 space-y-5">
        <BackButton />

        <div className="bg-white p-6 rounded-xl shadow flex flex-col lg:flex-row lg:justify-between gap-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-[#005CAB] rounded-lg flex items-center justify-center text-2xl text-white">
              <i className="fa-solid fa-bus"></i>
            </div>

            <div className="ml-4">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-lg">{busData?.busName}</h2>

                <span className="bg-blue-100 text-[#005CAB] px-2 py-1 rounded-full text-xs font-bold">
                  {busData?.busCategory}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                {busData?.origin} → {busData?.destination}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                {busData?.ac ? "AC" : "Non-AC"}{" "}
                {busData?.sleeper ? "Sleeper" : "Seater"}
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center">
            <div className="text-sm">
              <p className="text-slate-700 font-medium tracking-widest">
                DEPARTURE
              </p>

              <p className="font-bold">
                {new Date(busData?.departureTime).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="text-sm">
              <p className="text-slate-700 font-medium tracking-widest">
                DURATION
              </p>

              <p className="font-bold">{busData?.durationInMinutes} mins</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <Legend />

            <BusLayout
              seats={seats}
              onSelect={handleSelect}
              selectedSeats={selected}
            />
          </div>

          <div className="lg:sticky lg:top-25 h-fit">
            <SeatSelectionSummary
              selectedSeats={selected}
              fare={busData?.fare}
              busId={busId}
              busData={busData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
