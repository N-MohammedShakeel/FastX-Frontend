import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerPassenger, registerOperator } from "../services/authService";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Passenger");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "",
    level: 0,
    color: "",
  });

  const navigate = useNavigate();

  const roles = ["Passenger", "Operator"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
      api: "",
    });
  };

  useEffect(() => {
    const password = formData.password.trim();

    if (!password) {
      setPasswordStrength({
        strength: "",
        level: 0,
        color: "",
      });
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      setPasswordStrength({
        strength: "Weak",
        level: 1,
        color: "#EF4444",
      });
    } else if (score <= 3) {
      setPasswordStrength({
        strength: "Medium",
        level: 2,
        color: "#0075D7",
      });
    } else {
      setPasswordStrength({
        strength: "Strong",
        level: 3,
        color: "#16A34A",
      });
    }
  }, [formData.password]);

  const passwordsMatch =
    formData.confirmPassword && formData.password === formData.confirmPassword;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (passwordStrength.level < 2) {
      newErrors.password = "Password is too weak";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (!passwordsMatch) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.gender &&
    formData.address &&
    passwordStrength.level >= 2 &&
    passwordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        address: formData.address,
        password: formData.password,
      };

      let response;

      if (selectedRole === "Operator") {
        response = await registerOperator(payload);
      } else {
        response = await registerPassenger(payload);
      }

      const apiResponse = response;

      if (
        apiResponse.data?.toLowerCase().includes("already" | "unauthorized")
      ) {
        setErrors({
          api: apiResponse.data,
        });

        return;
      }

      console.log(apiResponse.message);

      navigate("/signin");
      toast.success("Registration successful! Please log in.");
    } catch (error) {
      console.log(error);

      setErrors({
        api: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `http://localhost:8080/api/auth/oauth2/start?role=${selectedRole.toUpperCase()}`;
  };

  return (
    <div className="min-h-screen bg-[#FBF9F9]">
      <div className="lg:hidden bg-[#005CAB] text-white px-6 py-5 shadow-sm">
        <h1 className="text-xl font-bold">FastX</h1>

        <p className="text-xs opacity-80 mt-1">
          Create your account and start booking faster
        </p>
      </div>

      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="relative hidden lg:flex lg:w-1/2 min-h-screen overflow-hidden bg-[#EFEDED]">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop"
            alt="Travel background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative z-10 flex h-full w-full items-end p-12">
            <div className="max-w-xl text-white">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D5E3FF]">
                Start Your Journey
              </p>

              <h1 className="max-w-sm text-4xl font-extrabold leading-tight">
                Create an account and explore more.
              </h1>

              <p className="mt-4 text-base leading-7 text-[#D5E3FF]/90">
                Join FastX to unlock faster bookings and exclusive travel
                rewards.
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full lg:w-1/2 items-center justify-center px-4 py-8 sm:px-6 lg:px-12">
          <div className="w-full max-w-xl space-y-5 sm:space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1B1C1C]">
                Create Account
              </h2>

              <p className="text-[11px] sm:text-xs lg:text-sm text-[#525F71]">
                Please fill in your details to begin your FastX experience.
              </p>
            </div>

            <div className="flex rounded-2xl bg-[#F5F3F3] p-1">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 rounded-xl px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition ${
                    selectedRole === role
                      ? "bg-white text-[#005CAB] shadow"
                      : "text-[#404754]"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {errors.api && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errors.api}
                </div>
              )}

              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-semibold uppercase text-[#525F71]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`mt-1 h-11 sm:h-12 w-full rounded-xl border px-4 text-sm focus:outline-none ${
                      errors.name ? "border-red-500" : "border-slate-200"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase text-[#525F71]">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@fastx.com"
                    className={`mt-1 h-11 sm:h-12 w-full rounded-xl border px-4 text-sm focus:outline-none ${
                      errors.email ? "border-red-500" : "border-slate-200"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-semibold uppercase text-[#525F71]">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className={`mt-1 h-11 sm:h-12 w-full rounded-xl border px-4 text-sm focus:outline-none ${
                      errors.phone ? "border-red-500" : "border-slate-200"
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase text-[#525F71]">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`mt-1 h-11 sm:h-12 w-full rounded-xl border px-4 text-sm focus:outline-none ${
                      errors.gender ? "border-red-500" : "border-slate-200"
                    }`}
                  >
                    <option value="">Select</option>

                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>

                  {errors.gender && (
                    <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase text-[#525F71]">
                  Address
                </label>

                <textarea
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address..."
                  className={`mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none ${
                    errors.address ? "border-red-500" : "border-slate-200"
                  }`}
                />

                {errors.address && (
                  <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase text-[#525F71]">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`h-11 sm:h-12 w-full rounded-xl border px-4 pr-10 text-sm focus:outline-none ${
                        errors.password ? "border-red-500" : "border-slate-200"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#707785]"
                    >
                      <i
                        className={
                          showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                        }
                      />
                    </button>
                  </div>

                  {formData.password && (
                    <div className="flex flex-col items-start gap-1 px-1">
                      <div className="flex gap-1 w-full">
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{
                              background:
                                item <= passwordStrength.level
                                  ? passwordStrength.color
                                  : "#E3E2E2",
                            }}
                          />
                        ))}
                      </div>

                      <p
                        className="text-[10px] font-semibold"
                        style={{
                          color: passwordStrength.color,
                        }}
                      >
                        Strength: {passwordStrength.strength}
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase text-[#525F71]">
                    Confirm Password
                  </label>

                  <div className="relative mt-2">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`h-11 sm:h-12 w-full rounded-xl border px-4 pr-10 text-sm focus:outline-none ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : passwordsMatch
                            ? "border-green-500"
                            : "border-slate-200"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#707785]"
                    >
                      <i
                        className={
                          showConfirmPassword
                            ? "fas fa-eye-slash"
                            : "fas fa-eye"
                        }
                      />
                    </button>
                  </div>

                  {formData.confirmPassword && (
                    <p
                      className={`mt-1 text-[10px] font-medium ${
                        passwordsMatch ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {passwordsMatch
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full rounded-full py-3 text-sm font-bold text-white transition-all duration-300 ${
                  isFormValid
                    ? "bg-[#005CAB]"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                {loading
                  ? "Creating Account..."
                  : `Create ${selectedRole} Account`}
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-[#FBF9F9] px-4 text-sm text-slate-500">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="flex items-center justify-center gap-3 rounded-2xl border border-red-400 bg-white px-8 py-4 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <i className="fab fa-google text-lg text-red-500" />
                  Google
                </button>
              </div>
            </form>

            <div className="text-center text-xs sm:text-sm">
              Already have an account?{" "}
              <Link to="/signin" className="font-bold text-[#005CAB]">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
