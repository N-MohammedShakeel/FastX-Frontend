import React, { useState } from "react";
import { forgotPassword } from "../../services/authService";
import { toast } from "react-toastify";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      if (!email.trim()) {
        setMessage("Email is required");
        return;
      }

      setLoading(true);
      setMessage("");

      const response = await forgotPassword(email);

      setMessage(response.message || "Temporary password sent to email");

      toast.success(
        "Please set a new password on your profile page after signing in.",
      );

      setEmail("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Forgot Password</h2>

          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Enter your registered email. A temporary password will be sent to you.
        </p>

        <div className="mt-5">
          <label className="text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-[#005CAB]"
          />
        </div>

        {message && (
          <div className="mt-4 rounded-2xl bg-slate-100 p-3 text-sm text-slate-700">
            {message}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 h-14 w-full rounded-2xl bg-linear-to-r from-[#005CAB] to-[#0075D7] font-bold text-white"
        >
          {loading ? "Sending..." : "Send Temporary Password"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
