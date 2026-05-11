import React, { useState } from "react";

const FilterSidebar = ({ onApply }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [fare, setFare] = useState(2000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const busTypes = [
    "AC Sleeper",
    "Non-AC Sleeper",
    "AC Seater",
    "Non-AC Seater",
  ];
  const amenitiesList = ["Charging", "Water", "Blanket", "TV"];

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleAmenity = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
    );
  };

  const handleApply = () => {
    onApply({
      types: selectedTypes,
      maxFare: fare,
      amenities: selectedAmenities,
    });
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setFare(2000);
    setSelectedAmenities([]);
  };

  return (
    <div className="w-full bg-[#F5F3F3] p-5 sm:p-6 rounded-xl flex flex-col h-full">
      <div className="space-y-8 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[#1B1C1C]">Filters</h2>
          <button
            onClick={handleReset}
            className="text-[#005CAB] font-semibold text-sm"
          >
            Reset
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Bus Type</h3>

          {busTypes.map((type) => (
            <label key={type} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="w-5 h-5"
              />
              <span className="text-[#404754] text-sm sm:text-base">
                {type}
              </span>
            </label>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Fare Range</h3>

          <input
            type="range"
            min={500}
            max={2000}
            value={fare}
            onChange={(e) => setFare(e.target.value)}
            className="w-full"
          />

          <div className="flex justify-between text-sm text-[#404754]">
            <span>₹500</span>
            <span>₹{fare}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Amenities</h3>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {amenitiesList.map((item) => (
              <button
                key={item}
                onClick={() => toggleAmenity(item)}
                className={`border px-3 py-2 rounded-lg text-xs sm:text-sm ${
                  selectedAmenities.includes(item)
                    ? "bg-[#005CAB] text-white"
                    : "bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleApply}
          className="w-full h-12 rounded-xl bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white font-bold shadow-lg"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
