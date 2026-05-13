import React from "react";

const BookingCard = ({ booking, onCancel, onView }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl space-y-4 sm:space-y-6 relative">
      <div className="flex items-start sm:items-center gap-3 sm:gap-1">
        <div className="bg-[#F5F3F3] border border-[#eae8e8] rounded-xl w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 flex flex-col items-center justify-center p-1 sm:p-2">
          <span className="text-[10px] sm:text-xs text-[#404754]">
            {booking.departureTime
              ? new Date(booking.departureTime).toLocaleString("en-IN", {
                  month: "short",
                })
              : "--"}
          </span>

          <span className="text-base sm:text-lg lg:text-xl font-bold">
            {booking.departureTime
              ? new Date(booking.departureTime).getDate()
              : "--"}
          </span>
        </div>

        <div className="flex-1 lg:pr-24 ps-3 justify-around">
          <div className="flex justify-between items-start sm:items-center gap-2 mt-2 sm:mt-4 lg:mt-6">
            <div>
              <p className="text-[10px] sm:text-xs text-slate-600">Departure</p>

              <p className="text-sm sm:text-base lg:text-lg font-bold">
                {booking.origin}
              </p>

              <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#005CAB]">
                {booking.departureTime
                  ? new Date(booking.departureTime).toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )
                  : "--"}
              </p>
            </div>

            <div className="text-center text-slate-400 text-xs sm:text-sm">
              →
              <p className="text-[10px] sm:text-xs font-bold text-[#6a6c71]">
                {booking.departureTime && booking.arrivalTime
                  ? `${Math.floor(
                      (new Date(booking.arrivalTime) -
                        new Date(booking.departureTime)) /
                        (1000 * 60 * 60),
                    )}H`
                  : "--"}
              </p>
            </div>

            <div className="max-w-25 sm:max-w-30 lg:max-w-35 wrap-break-words text-right sm:text-left">
              <p className="text-[10px] sm:text-xs text-slate-600">Arrival</p>

              <p className="text-sm sm:text-base lg:text-lg font-bold">
                {booking.destination}
              </p>

              <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-black">
                {booking.arrivalTime
                  ? new Date(booking.arrivalTime).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "--"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-5 items-center mt-3 sm:mt-4 text-xs sm:text-sm">
            <p className="font-medium">
              Seats: {booking.seatNumbers?.join(", ")}
            </p>
            <p className="font-medium">Bus #{booking.busNumber}</p>
          </div>
        </div>

        <div className="sm:hidden self-start ml-auto">
          <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-green-100 text-green-600">
            {booking.status}
          </span>
        </div>
      </div>

      <div className="hidden sm:block absolute top-5 right-5 lg:top-6 lg:right-6">
        <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs lg:text-sm font-semibold rounded-full bg-green-100 text-green-600">
          {booking.status}
        </span>
      </div>

      <div className="flex gap-3 pt-3">
        <button
          onClick={() => onView(booking)}
          className="bg-[#005CAB] text-white px-6 py-2 rounded-xl text-sm font-semibold flex-1"
        >
          View Ticket
        </button>

        <button
          onClick={() => onCancel(booking)}
          className="border border-red-400 px-6 py-2 rounded-xl text-red-600 text-sm font-semibold"
        >
          Cancel Ticket
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
