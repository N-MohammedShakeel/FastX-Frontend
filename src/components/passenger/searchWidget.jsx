import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchWidget = () => {
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    date: "",
  });

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    const trimmedOrigin = searchData.origin.trim();

    const trimmedDestination = searchData.destination.trim();

    if (!trimmedOrigin || !trimmedDestination || !searchData.date) {
      alert("Please fill all search fields");
      return;
    }

    navigate("/search", {
      state: {
        origin: trimmedOrigin,
        destination: trimmedDestination,
        date: searchData.date,
      },
    });
  };

  return (
    <div className="bg-[#F5F3F3] p-5 sm:p-6 md:p-8 rounded-xl space-y-6 w-full shadow-sm">
      <div className="flex items-center gap-3">
        <i className="fa-solid fa-bus text-[#005CAB]"></i>

        <h3 className="text-lg sm:text-xl font-bold">Book a Journey</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative bg-white border rounded-xl p-4 flex items-center gap-3 w-full">
          <i className="fa-solid fa-location-dot text-gray-400"></i>

          <div className="w-full">
            <span className="absolute -top-2 left-4 text-xs font-bold text-[#005CAB] bg-[#F5F3F3] px-1">
              ORIGIN
            </span>

            <input
              type="text"
              name="origin"
              value={searchData.origin}
              onChange={handleChange}
              placeholder="From where?"
              className="outline-none w-full"
              required
            />
          </div>
        </div>

        <div className="relative bg-white border rounded-xl p-4 flex items-center gap-3 w-full">
          <i className="fa-solid fa-location-dot text-gray-400"></i>

          <div className="w-full">
            <span className="absolute -top-2 left-4 text-xs font-bold text-[#005CAB] bg-[#F5F3F3] px-1">
              DESTINATION
            </span>

            <input
              type="text"
              name="destination"
              value={searchData.destination}
              onChange={handleChange}
              placeholder="To where?"
              className="outline-none w-full"
              required
            />
          </div>
        </div>

        <div className="relative bg-white border rounded-xl p-4 flex items-center gap-3 w-full">
          <FaCalendarAlt className="text-gray-400" />

          <div className="w-full">
            <span className="absolute -top-2 left-4 text-xs font-bold text-[#005CAB] bg-[#F5F3F3] px-1">
              DATE
            </span>

            <input
              type="date"
              name="date"
              value={searchData.date}
              onChange={handleChange}
              className="outline-none w-full"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full h-12 sm:h-14 rounded-xl bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white font-bold shadow-lg"
      >
        Search Buses
      </button>
    </div>
  );
};

export default SearchWidget;
