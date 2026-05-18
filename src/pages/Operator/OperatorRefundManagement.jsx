import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import OperatorLayout from "../../components/operator/OperatorLayout";
import TableLayout from "../../components/common/TableLayout";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import SuccessConfirmModal from "../../components/common/SuccessConfirmModal";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import {
  fetchRefundRequests,
  approveRefundAction,
  rejectRefundAction,
} from "../../store/operator/operator-actions";

const OperatorRefundManagement = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);

  const refunds = useSelector((state) => state.operatorRefund.refunds);
  const loading = useSelector((state) => state.operatorRefund.loading);
  const error = useSelector((state) => state.operatorRefund.error);

  useEffect(() => {
    dispatch(fetchRefundRequests());
  }, [dispatch]);

  const filteredRefunds = useMemo(() => {
    return refunds.filter((refund) => {
      const passengerName = refund.passengerName?.toLowerCase() || "";
      const busNumber = refund.busNumber?.toLowerCase() || "";
      return (
        passengerName.includes(search.toLowerCase()) ||
        busNumber.includes(search.toLowerCase())
      );
    });
  }, [refunds, search]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredRefunds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRefunds = filteredRefunds.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const openApproveModal = (refund) => {
    setSelectedRefund(refund);
    setIsApproveOpen(true);
  };

  const openRejectModal = (refund) => {
    setSelectedRefund(refund);
    setIsRejectOpen(true);
  };

  const handleApproveRefund = () => {
    dispatch(
      approveRefundAction(selectedRefund.refundId, {
        bookingId: selectedRefund.bookingId,
        status: "APPROVED",
      }),
    );

    setIsApproveOpen(false);
    setSelectedRefund(null);
  };

  const handleRejectRefund = () => {
    dispatch(
      rejectRefundAction(selectedRefund.refundId, {
        bookingId: selectedRefund.bookingId,
        status: "REJECTED",
      }),
    );

    setIsRejectOpen(false);
    setSelectedRefund(null);
  };

  return (
    <OperatorLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Refund Management
          </h1>

          <p className="text-slate-500 mt-2">
            Handle passenger refund requests and approvals.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

            <input
              type="text"
              placeholder="Search by passenger or bus number..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005CAB] outline-none transition"
            />
          </div>

          <p className="text-sm text-slate-500 font-medium">
            {filteredRefunds.length} refund requests
          </p>
        </div>

        {error && <Error message={error} />}

        {loading ? (
          <Loading message="Loading refunds..." />
        ) : (
          <TableLayout
            title="Refund Requests"
            subtitle="Approve or reject refund requests"
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredRefunds.length}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            empty={paginatedRefunds.length === 0}
          >
            <>
              <thead className="bg-slate-50/50">
                <tr className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="text-left px-8 py-4">Passenger</th>
                  <th className="text-left px-6 py-4">Booking Time</th>
                  <th className="text-left px-6 py-4">Amount</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-right px-8 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedRefunds.map((refund) => (
                  <tr
                    key={refund.refundId}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="px-8 py-5">
                      <div>
                        <p className="font-bold text-slate-900">
                          {refund.passengerName}
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          {refund.busNumber}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-700">
                        {new Date(refund.bookingTime).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>

                    <td className="px-6 py-5 font-bold text-slate-900">
                      ₹{refund.amount}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                        
                        ${
                          refund.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : refund.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {refund.status}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      {refund.status === "PENDING" ? (
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => openApproveModal(refund)}
                            className="w-10 h-10 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 flex items-center justify-center transition"
                          >
                            <FaCheck className="text-sm" />
                          </button>

                          <button
                            onClick={() => openRejectModal(refund)}
                            className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
                          >
                            <FaTimes className="text-sm" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <span className="text-sm font-semibold text-slate-400">
                            Processed
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          </TableLayout>
        )}
      </div>

      <SuccessConfirmModal
        isOpen={isApproveOpen}
        onClose={() => {
          setIsApproveOpen(false);
          setSelectedRefund(null);
        }}
        onConfirm={handleApproveRefund}
        title="Approve Refund"
        description={`Are you sure you want to approve refund for ${selectedRefund?.passengerName}?`}
        confirmText="Approve"
      />

      <DeleteConfirmModal
        isOpen={isRejectOpen}
        onClose={() => {
          setIsRejectOpen(false);
          setSelectedRefund(null);
        }}
        onConfirm={handleRejectRefund}
        title="Reject Refund"
        description={`Are you sure you want to reject refund for ${selectedRefund?.passengerName}?`}
        confirmText="Reject"
      />
    </OperatorLayout>
  );
};

export default OperatorRefundManagement;
