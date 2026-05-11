import React from "react";

const PopularRoutesCard = ({ route }) => {
  return (
    <div>
      <div
        key={route.title}
        className="overflow-hidden rounded-4xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="h-48 overflow-hidden">
          <img
            src={route.image}
            alt={route.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold leading-7 text-slate-900">
              {route.title}
            </h3>
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${route.tagColor}`}
            >
              {route.tag}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3"
                />
                <circle cx="12" cy="12" r="9" />
              </svg>
              {route.duration}
            </div>
            <div className="text-xl font-bold text-[#005CAB]">
              {route.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularRoutesCard;
