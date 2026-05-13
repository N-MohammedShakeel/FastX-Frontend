import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import BackButton from "../../components/common/BackButton";
import { Legend } from "../../components/passenger/SeatSelectionComponents/Legend";
import { BusLayout } from "../../components/passenger/SeatSelectionComponents/BusLayout";
import { SeatSelectionSummary } from "../../components/passenger/SeatSelectionComponents/SeatSelectionSummary";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeats } from "../../store/passenger/passenger-actions";
import { seatActions } from "../../store/passenger/seatSlice";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";

export default function SeatSelectionPage() {
  const { busId } = useParams();
  const location = useLocation();

  const busData = location.state;

  const dispatch = useDispatch();

  const seats = useSelector((state) => state.seat.seats);
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);

  const seatLoading = useSelector((state) => state.seat.loading);
  const seatError = useSelector((state) => state.seat.error);

  useEffect(() => {
    dispatch(seatActions.clearSeats());
    dispatch(fetchSeats(busId, busData));
  }, [busId, busData, dispatch]);

  const handleSelect = (id) => {
    dispatch(seatActions.toggleSeat(id));
  };

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

            {seatError && <Error message={seatError} />}
            {seatLoading ? (
              <Loading message="Loading Seats ..." />
            ) : (
              <BusLayout
                seats={seats}
                onSelect={handleSelect}
                selectedSeats={selectedSeats}
              />
            )}
          </div>

          <div className="lg:sticky lg:top-25 h-fit">
            {seatLoading ? (
              <Loading message="Calculating Summary ..." />
            ) : (
              <SeatSelectionSummary
                selectedSeats={selectedSeats}
                fare={busData?.fare}
                busId={busId}
                busData={busData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
