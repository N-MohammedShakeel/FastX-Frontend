import React, { useEffect, useState } from "react";

import {
  FaBus,
  FaChair,
  FaSnowflake,
  FaBed,
  FaTv,
  FaChargingStation,
  FaBottleWater,
  FaRoute,
} from "react-icons/fa6";

const BUS_TYPES = [
  {
    label: "AC Sleeper",
    value: "AC_SLEEPER",
    ac: true,
    sleeper: true,
  },
  {
    label: "AC Seater",
    value: "AC_SEATER",
    ac: true,
    sleeper: false,
  },
  {
    label: "Non-AC Sleeper",
    value: "NON_AC_SLEEPER",
    ac: false,
    sleeper: true,
  },
  {
    label: "Non-AC Seater",
    value: "NON_AC_SEATER",
    ac: false,
    sleeper: false,
  },
];

const BusFormModal = ({
  isOpen,
  onClose,
  onSave,
  loading = false,
  bus = null,
  routes = [],
}) => {
  const [formData, setFormData] = useState({
    name: "",
    busNumber: "",
    busCategory: "",
    noOfSeats: "",
    fare: "",
    type: "AC_SLEEPER",
    waterBottle: false,
    blanket: false,
    tv: false,
    chargingPoint: false,

    routeId: "",
  });

  useEffect(() => {
    if (bus) {
      const matchedType = BUS_TYPES.find(
        (type) => type.ac === bus.ac && type.sleeper === bus.sleeper,
      );

      setFormData({
        name: bus.name || "",
        busNumber: bus.busNumber || "",
        busCategory: bus.busCategory || "",
        noOfSeats: bus.noOfSeats || "",
        fare: bus.fare || "",
        type: matchedType?.value || "AC_SLEEPER",

        waterBottle: bus.waterBottle || false,
        blanket: bus.blanket || false,
        tv: bus.tv || false,
        chargingPoint: bus.chargingPoint || false,

        routeId: bus.routeId || "",
      });
    }
  }, [bus]);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const selectedType = BUS_TYPES.find((item) => item.value === formData.type);

    onSave({
      name: formData.name,
      busNumber: formData.busNumber,
      busCategory: formData.busCategory.toUpperCase(),
      noOfSeats: Number(formData.noOfSeats),
      fare: Number(formData.fare),

      ac: selectedType.ac,
      sleeper: selectedType.sleeper,

      waterBottle: formData.waterBottle,
      blanket: formData.blanket,
      tv: formData.tv,
      chargingPoint: formData.chargingPoint,

      routeId: Number(formData.routeId),
    });
    

    setFormData({
      name: "",
      busNumber: "",
      busCategory: "",
      noOfSeats: "",
      fare: "",
      type: "AC_SLEEPER",
      waterBottle: false,
      blanket: false,
      tv: false,
      chargingPoint: false,
      routeId: "",
    });
  };

  const amenities = [
    {
      key: "waterBottle",
      label: "Water Bottle",
      icon: <FaBottleWater />,
    },
    {
      key: "blanket",
      label: "Blanket",
      icon: <FaBed />,
    },
    {
      key: "tv",
      label: "TV",
      icon: <FaTv />,
    },
    {
      key: "chargingPoint",
      label: "Charging Point",
      icon: <FaChargingStation />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#FBF9F9] rounded-3xl shadow-2xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              {bus ? "Update Bus" : "Register Bus"}
            </h2>

            <p className="text-slate-500 mt-1">
              Manage fleet registration details
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-8 grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <FaBus className="text-[#005CAB]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Bus Details
                </h3>

                <p className="text-sm text-slate-500">
                  Configure bus information
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Bus Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Bus Number
                </label>

                <input
                  type="text"
                  value={formData.busNumber}
                  onChange={(e) => handleChange("busNumber", e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Category
                </label>

                <input
                  type="text"
                  placeholder="Premium / Classic"
                  value={formData.busCategory}
                  onChange={(e) => handleChange("busCategory", e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Bus Type
                </label>

                <select
                  value={formData.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB]"
                >
                  {BUS_TYPES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Seats
                </label>

                <input
                  type="number"
                  value={formData.noOfSeats}
                  onChange={(e) => handleChange("noOfSeats", e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Fare Per Seat
                </label>

                <input
                  type="number"
                  value={formData.fare}
                  onChange={(e) => handleChange("fare", e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB]"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Route
                </label>

                <div className="relative">
                  <FaRoute className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <select
                    value={formData.routeId}
                    onChange={(e) => handleChange("routeId", e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB]"
                  >
                    <option value="">Select Route</option>

                    {routes.map((route) => (
                      <option key={route.routeId} value={route.routeId}>
                        {route.origin} → {route.destination}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Amenities</h3>

            <div className="space-y-4">
              {amenities.map((item) => (
                <label
                  key={item.key}
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition ${
                    formData[item.key]
                      ? "border-[#005CAB] bg-blue-50"
                      : "border-slate-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData[item.key]}
                    onChange={(e) => handleChange(item.key, e.target.checked)}
                    className="hidden"
                  />

                  <div className="text-[#005CAB] text-lg">{item.icon}</div>

                  <span className="font-semibold text-slate-700">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-8 h-14 rounded-2xl bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white font-bold shadow-xl hover:scale-[1.01] transition disabled:opacity-60"
            >
              {loading ? "Saving..." : bus ? "Update Bus" : "Register Bus"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusFormModal;
