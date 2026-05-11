import React from "react";

const PromoCard = () => {
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative p-4 sm:p-5 lg:p-6 text-white">
          <h3 className="text-lg sm:text-xl font-bold">Travel Insurance</h3>

          <p className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2">
            Protect your journey for just ₹99.
          </p>

          <button className="mt-3 sm:mt-4 bg-[#005CAB] px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-semibold">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default PromoCard;
