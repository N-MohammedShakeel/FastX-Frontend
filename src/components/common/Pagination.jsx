import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="p-2 rounded-xl border border-slate-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <FaChevronLeft className="text-slate-600 text-xs" />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={index}
            className="w-10 h-10 flex items-center justify-center text-slate-400 font-bold"
          >
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all
        
            ${
              currentPage === page
                ? "bg-[#005CAB] text-white shadow-lg shadow-blue-100"
                : "text-slate-600 hover:bg-white border border-transparent hover:border-slate-200"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="p-2 rounded-xl border border-slate-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <FaChevronRight className="text-slate-600 text-xs" />
      </button>
    </div>
  );
};

export default Pagination;
