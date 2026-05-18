import React from "react";

const SuccessConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-100">
            <i className="fa-solid fa-check text-green-600 text-2xl"></i>
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

            <p className="mt-3 text-slate-500 leading-relaxed">{description}</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 h-12 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition disabled:opacity-50"
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-50"
            >
              {loading ? "Processing..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessConfirmModal;
