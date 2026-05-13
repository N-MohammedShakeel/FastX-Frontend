import React, { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import { FaUser, FaLock, FaPlus } from "react-icons/fa";
import WalletD2 from "../../components/passenger/WalletD2";
import ContactCard from "../../components/passenger/ContactCard";
import { PassengerSidebarContent } from "../../components/passenger/PassengerSidebarContent";
import { useDispatch, useSelector } from "react-redux";
import {
  addMoney,
  changePassword,
  fetchProfile,
  updatePassengerProfile,
} from "../../store/passenger/passenger-actions";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import EditProfileModal from "../../components/passenger/EditProfileModal";

export default function UserProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.profile);
  const passwordSuggestion = useSelector(
    (state) =>
      state.profile.profile?.provider === "GOOGLE" &&
      !state.profile.profile?.passwordChanged,
  );

  const profileLoading = useSelector((state) => state.profile.loading);
  const profileError = useSelector((state) => state.profile.error);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.provider === "GOOGLE" && passwordSuggestion) {
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
  }, [profile, passwordSuggestion]);

  const handleProfileUpdate = async (data) => {
    await dispatch(updatePassengerProfile(data));
    setIsEditOpen(false);
  };

  if (profileLoading) {
    return <Loading message="Loading profile..." />;
  }

  if (profileError) {
    return <Error message={profileError} />;
  }

  const handleUpdatePassword = () => {
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword ||
      passwordData.oldPassword.trim() === "" ||
      passwordData.newPassword.trim() === "" ||
      passwordData.confirmPassword.trim() === ""
    ) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(
      changePassword({
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

  return (
    <div className="min-h-screen bg-[#FBF9F9]">
      <Navbar />

      <div className="lg:hidden flex items-center justify-between px-4 py-3 mt-5">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col gap-1"
        >
          <span className="w-8 h-1 bg-[#005CAB]"></span>
          <span className="w-6 h-1 bg-[#005CAB]"></span>
          <span className="w-8 h-1 bg-[#005CAB]"></span>
        </button>

        <div className="w-5"></div>
      </div>

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <PassengerSidebarContent onClose={() => setIsSidebarOpen(false)} />
        </Sidebar>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex md:flex-row flex-col gap-8 justify-between items-center">
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-black text-slate-900">
                  Account Profile
                </h1>

                <p className="text-slate-500 text-sm sm:text-base">
                  Manage your personal details, wallet, and security settings
                </p>
              </div>

              <WalletD2
                balance={profile?.wallet}
                onAddMoney={(amount) => dispatch(addMoney(amount))}
              />
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
                          Personal Details
                        </h2>

                        <p className="text-sm text-slate-500">
                          Your account information
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
                          Full Name
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
                      Your account was created using Google Sign-In. Please
                      change your temporary password for security.
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
                        Update your password securely
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
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            oldPassword: e.target.value,
                          })
                        }
                        disabled={passwordSuggestion}
                        required
                        className="w-full h-12 px-4 rounded-2xl bg-slate-100 border border-transparent focus:border-[#005CAB] outline-none"
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
                        required
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
                        required
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
        </main>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onSave={handleProfileUpdate}
        loading={profileLoading}
      />
    </div>
  );
}
