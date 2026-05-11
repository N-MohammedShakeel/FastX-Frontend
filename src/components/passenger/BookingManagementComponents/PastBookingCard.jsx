import React from "react";

const PastBookingCard = ({ booking }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-[#F5F3F3] p-3 sm:p-4 rounded-xl">
      <div className="w-8 sm:w-10 h-10 sm:h-12 flex items-center justify-center bg-[#DBDAD9]/60 rounded-lg">
        <i className="fa fa-history"></i>
      </div>

      <div className="flex-1">
        <p className="text-xs sm:text-sm font-semibold text-[#1B1C1C]">
          {booking.busName}
        </p>

        <p className="text-[10px] sm:text-xs text-[#404754]">
          {booking.bookingTime
            ? new Date(booking.bookingTime).toLocaleDateString("en-IN")
            : "Completed"}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs sm:text-sm font-extrabold text-[#1B1C1C]">
          ₹{booking.totalFare}
        </p>

        <p className="text-[9px] sm:text-[10px] font-bold text-[#005CAB] uppercase">
          Paid
        </p>
      </div>
    </div>
  );
};

export default PastBookingCard;
