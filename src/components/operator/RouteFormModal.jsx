import React, { useEffect, useState } from "react";

import { FaRoute, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const RouteFormModal = ({
  isOpen,
  onClose,
  onSave,
  loading = false,
  route = null,
}) => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureTime: "",
    durationInMinutes: "",
  });

  useEffect(() => {
    if (route) {
      setFormData({
        origin: route.origin || "",
        destination: route.destination || "",
        departureTime: route.departureTime
          ? route.departureTime.slice(0, 16)
          : "",
        durationInMinutes: route.durationInMinutes || "",
      });
    } else {
      setFormData({
        origin: "",
        destination: "",
        departureTime: "",
        durationInMinutes: "",
      });
    }
  }, [route]);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#FBF9F9] rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              {route ? "Update Route" : "Add Route"}
            </h2>

            <p className="text-slate-500 mt-1">
              Configure trip schedules and destinations
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              setFormData({
                origin: "",
                destination: "",
                departureTime: "",
                durationInMinutes: "",
              });
            }}
            className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <FaRoute className="text-[#005CAB]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Route Details
                </h3>

                <p className="text-sm text-slate-500">
                  Travel path and schedule
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Origin
                </label>

                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => handleChange("origin", e.target.value)}
                    placeholder="Chennai"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-100 border border-transparent focus:border-[#005CAB] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Destination
                </label>

                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) =>
                      handleChange("destination", e.target.value)
                    }
                    placeholder="Bangalore"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-100 border border-transparent focus:border-[#005CAB] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Departure Time
                </label>

                <input
                  type="datetime-local"
                  value={formData.departureTime}
                  onChange={(e) =>
                    handleChange("departureTime", e.target.value)
                  }
                  className="w-full h-14 px-4 rounded-2xl bg-slate-100 border border-transparent focus:border-[#005CAB] outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Duration
                </label>

                <div className="relative">
                  <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="number"
                    value={formData.durationInMinutes}
                    onChange={(e) =>
                      handleChange("durationInMinutes", e.target.value)
                    }
                    placeholder="420"
                    className="w-full h-14 pl-12 pr-16 rounded-2xl bg-slate-100 border border-transparent focus:border-[#005CAB] outline-none"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                    mins
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onSave({
                ...formData,
                durationInMinutes: Number(formData.durationInMinutes),
                departureTime: new Date(formData.departureTime).toISOString(),
              });

              setFormData({
                origin: "",
                destination: "",
                departureTime: "",
                durationInMinutes: "",
              });
            }}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white font-bold shadow-xl hover:scale-[1.01] transition disabled:opacity-60"
          >
            {loading ? "Saving..." : route ? "Update Route" : "Create Route"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteFormModal;
