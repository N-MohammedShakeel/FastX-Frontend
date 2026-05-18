import React from "react";
import Pagination from "./Pagination";

const TableLayout = ({
  title,
  subtitle,
  children,
  currentPage,
  totalPages,
  setCurrentPage,
  totalItems,
  startIndex,
  itemsPerPage,
  empty,
}) => {
  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="text-slate-500 text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">{children}</table>
      </div>

      {empty && (
        <div className="py-20 text-center text-slate-400">No data found.</div>
      )}

      {!empty && (
        <div className="px-8 py-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-900">{startIndex + 1}</span> to{" "}
            <span className="text-slate-900">
              {Math.min(startIndex + itemsPerPage, totalItems)}
            </span>{" "}
            of <span className="text-slate-900">{totalItems}</span> entries
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
};

export default TableLayout;
