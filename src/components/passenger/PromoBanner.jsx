import React from "react";
import { useNavigate } from "react-router-dom";

const PromoBanner = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden h-55 flex items-center px-6 lg:px-12">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative text-white max-w-lg space-y-4">
          <h3 className="text-2xl lg:text-3xl font-extrabold">
            Explore New Destinations
          </h3>
          <p className="text-white/80">
            Discover amazing routes and travel experiences across India.
          </p>

          <button
            onClick={() => navigate("/search")}
            className="bg-white text-[#005CAB] px-6 py-3 rounded-xl font-bold hover:animate-pulse"
          >
            Explore Now
          </button>
        </div>
      </div>
    </>
  );
};

export default PromoBanner;
