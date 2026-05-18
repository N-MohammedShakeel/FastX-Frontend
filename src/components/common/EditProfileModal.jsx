import React, { useEffect, useState } from "react";

const EditProfileModal = ({ isOpen, onClose, profile, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        gender: profile.gender || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Edit Profile</h2>

            <p className="text-sm text-slate-500 mt-1">
              Update your personal information
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6 grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Full Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full h-12 px-4 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Phone Number
            </label>

            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="w-full h-12 px-4 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB]"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Gender
            </label>

            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gender: e.target.value,
                })
              }
              className="w-full h-12 px-4 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB]"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Address
            </label>

            <textarea
              rows={4}
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 outline-none border border-transparent focus:border-[#005CAB] resize-none"
            />
          </div>
        </div>

        <div className="px-6 py-5 border-t border-slate-200 flex gap-4">
          <button
            onClick={() => onSave(formData)}
            disabled={loading}
            className="flex-1 h-12 rounded-2xl bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white font-bold disabled:opacity-50"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-2xl bg-slate-200 font-bold text-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
