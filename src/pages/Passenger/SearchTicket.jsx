import React, { useEffect, useState } from "react";
import FilterSidebar from "../../components/passenger/SearchTicketPageComponents/FilterSidebar";
import SearchWidget from "../../components/passenger/searchWidget";
import BusCard from "../../components/passenger/SearchTicketPageComponents/BusCard";
import NavBar from "../../components/common/NavBar";
import BackButton from "../../components/common/BackButton";
import { useLocation } from "react-router-dom";
import { getAllRoutes, searchRoutes } from "../../services/passengerService";

const SearchTickets = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const { origin, destination, date } = location.state || {};

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);

        let response;

        const hasSearch = origin?.trim() && destination?.trim() && date;

        if (hasSearch) {
          response = await searchRoutes(
            origin.trim(),
            destination.trim(),
            date,
          );
        } else {
          response = await getAllRoutes();
        }

        const routes = response.data || [];

        setBuses(routes);
        setFilteredBuses(routes);
      } catch (error) {
        console.log(error);

        setBuses([]);
        setFilteredBuses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [origin, destination, date]);

  const handleFilters = (filters) => {
    let updated = [...buses];

    if (filters.types.length > 0) {
      updated = updated.filter((bus) => {
        const busType = `${bus.ac ? "AC" : "Non-AC"} ${
          bus.sleeper ? "Sleeper" : "Seater"
        }`;

        return filters.types.includes(busType);
      });
    }

    updated = updated.filter((bus) => bus.fare <= filters.maxFare);

    if (filters.amenities.length > 0) {
      updated = updated.filter((bus) => {
        const amenities = [];

        if (bus.chargingPoint) amenities.push("Charging");
        if (bus.waterBottle) amenities.push("Water");
        if (bus.blanket) amenities.push("Blanket");
        if (bus.tv) amenities.push("TV");

        return filters.amenities.every((item) => amenities.includes(item));
      });
    }

    setFilteredBuses(updated);
  };
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4 lg:md-6">
          <div className="flex items-center gap-3">
            <BackButton />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-[#005CAB] text-white font-semibold text-sm shadow"
          >
            <i className="fa-solid fa-filter"></i>
            Filter
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block w-70 shrink-0">
            <FilterSidebar onApply={handleFilters} />
          </div>

          <div className="flex-1 space-y-6">
            <SearchWidget />
            <div className="bg-[#F5F3F3] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">
                  {origin && destination
                    ? `${origin} → ${destination}`
                    : "Available Buses"}
                </h2>

                <p className="text-sm text-slate-500">
                  {date &&
                    new Date(date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                </p>
              </div>

              <div className="text-[#005CAB] font-bold">
                {filteredBuses.length} bus{filteredBuses.length > 1 && "es"}{" "}
                found
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="bg-white rounded-xl p-10 text-center shadow">
                  <div className="h-12 w-12 border-4 border-[#005CAB] border-t-transparent rounded-full animate-spin mx-auto"></div>

                  <p className="mt-4 text-slate-500">Searching buses...</p>
                </div>
              ) : filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                  <BusCard key={bus.busId} bus={bus} />
                ))
              ) : (
                <div className="bg-white rounded-xl p-10 text-center shadow">
                  <i className="fa-solid fa-bus text-4xl text-slate-300"></i>

                  <p className="mt-4 text-lg font-semibold text-slate-700">
                    No bus found
                  </p>

                  <p className="text-sm text-slate-500">
                    Try changing your filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          <div className="relative w-full max-h-[85vh] bg-white rounded-t-2xl p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-sm font-semibold text-[#005CAB]"
              >
                Close
              </button>
            </div>

            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchTickets;
