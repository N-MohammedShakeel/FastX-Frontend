import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaBus, FaRoute, FaWallet } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OperatorLayout from "../../components/operator/OperatorLayout";
import WalletD1 from "../../components/common/WalletD1";
import ContactCard from "../../components/common/ContactCard";
import EditProfileModal from "../../components/common/EditProfileModal";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import {
  fetchOperatorProfile,
  editOperatorProfile,
  changeOperatorPassword,
} from "../../store/operator/operator-actions";

const OperatorProfile = () => {
  const dispatch = useDispatch();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const profile = useSelector((state) => state.operatorProfile.profile);
  const loading = useSelector((state) => state.operatorProfile.loading);
  const error = useSelector((state) => state.operatorProfile.error);

  const passwordSuggestion =
    profile?.provider === "GOOGLE" && !profile?.passwordChanged;

  useEffect(() => {
    dispatch(fetchOperatorProfile());
  }, [dispatch]);

  useEffect(() => {
    if (passwordSuggestion) {
      setPasswordData((prev) => ({
        ...prev,
        oldPassword: "sample",
      }));
    } else {
      setPasswordData((prev) => ({
        ...prev,
        oldPassword: "",
      }));
    }
  }, [passwordSuggestion]);

  const handleProfileUpdate = async (data) => {
    await dispatch(editOperatorProfile(data));
    setIsEditOpen(false);
  };

  const handleUpdatePassword = () => {
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(
      changeOperatorPassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      }),
    );

    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  if (loading) {
    return (
      <OperatorLayout>
        <Loading message="Loading profile..." />
      </OperatorLayout>
    );
  }

  if (error) {
    return (
      <OperatorLayout>
        <Error message={error} />
      </OperatorLayout>
    );
  }

  return (
    <>
      <OperatorLayout mainClassName="px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900">
                Operator Profile
              </h1>

              <p className="text-slate-500 text-sm sm:text-base">
                Manage your fleet account, security, and operational details
              </p>
            </div>

            <WalletD1 balance={profile?.wallet || 0} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <FaUser className="text-[#005CAB] text-lg" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Operator Details
                      </h2>

                      <p className="text-sm text-slate-500">
                        Fleet owner information
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditOpen(true)}
                    className="px-4 h-10 rounded-xl bg-[#005CAB]/10 text-[#005CAB] font-semibold text-sm hover:bg-[#005CAB]/20 transition"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                        Operator Name
                      </p>

                      <div className="bg-slate-50 rounded-2xl px-4 py-3 font-semibold text-slate-800">
                        {profile?.name || "Not Provided"}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                        Email Address
                      </p>

                      <div className="bg-slate-50 rounded-2xl px-4 py-3 font-semibold text-slate-800">
                        {profile?.email || "Not Provided"}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                        Phone Number
                      </p>

                      <div className="bg-slate-50 rounded-2xl px-4 py-3 font-semibold text-slate-800">
                        {profile?.phone || "Not Provided"}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                        Gender
                      </p>

                      <div className="bg-slate-50 rounded-2xl px-4 py-3 font-semibold text-slate-800">
                        {profile?.gender || "Not Provided"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                      Address
                    </p>

                    <div className="bg-slate-50 rounded-2xl px-4 py-3 font-semibold text-slate-800">
                      {profile?.address || "Not Provided"}
                    </div>
                  </div>
                </div>
              </div>

              <ContactCard />
            </div>

            <div className="space-y-6">
              {passwordSuggestion && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <h3 className="font-bold text-amber-700">
                    Change Your Default Password
                  </h3>

                  <p className="text-sm text-amber-600 mt-1">
                    Your account was created using Google Sign-In. Please change
                    your temporary password for security.
                  </p>
                </div>
              )}

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <FaLock className="text-[#005CAB] text-lg" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Security
                    </h2>

                    <p className="text-sm text-slate-500">
                      Update your account password
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                      Current Password
                    </label>

                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={passwordData.oldPassword}
                      disabled={passwordSuggestion}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          oldPassword: e.target.value,
                        })
                      }
                      className="w-full h-12 px-4 rounded-2xl bg-slate-100 border border-transparent focus:border-[#005CAB] outline-none disabled:opacity-60"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                      New Password
                    </label>

                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full h-12 px-4 rounded-2xl bg-slate-100 border border-transparent focus:border-[#005CAB] outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full h-12 px-4 rounded-2xl bg-slate-100 border border-transparent focus:border-[#005CAB] outline-none"
                    />
                  </div>

                  <button
                    onClick={handleUpdatePassword}
                    className="w-full h-12 rounded-2xl bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white font-bold shadow-lg hover:scale-[1.01] transition"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OperatorLayout>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onSave={handleProfileUpdate}
        loading={loading}
      />
    </>
  );
};

export default OperatorProfile;
