import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function SignIn() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("Passenger");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const roles = ["Passenger", "Operator", "Admin"];

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

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const navigateByRole = (role) => {
    if (role === "ADMIN") {
      navigate("/admin-dashboard");
    } else if (role === "OPERATOR") {
      navigate("/operator-dashboard");
    } else {
      navigate("/passenger-dashboard");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await loginUser(payload);

      const token = response.data;
      console.log(token);

      if (!token) {
        throw new Error("Token not received");
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const backendRole = decodedToken.role;

      if (selectedRole.toUpperCase() !== backendRole) {
        setErrors({
          api: `Invalid role`,
        });
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", backendRole);
      localStorage.setItem("userEmail", decodedToken.sub);

      navigateByRole(backendRole);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        setErrors({
          api: "Invalid email or password",
        });
      } else {
        setErrors({
          api: error.response?.data?.message || error.message || "Login failed",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:8080/api/auth/oauth2/start?role=${selectedRole.toUpperCase()}`;
  };

  const isFormValid = formData.email.trim() && formData.password.trim();

  return (
    <div className="min-h-screen bg-[#FBF9F9]">
      <div className="lg:hidden bg-[#005CAB] text-white px-4 py-4 sm:px-6 sm:py-5 shadow-sm">
        <h1 className="text-lg sm:text-xl font-bold">FastX</h1>

        <p className="text-xs opacity-80 mt-1">
          Sign in to manage your bookings and travel smarter
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="relative hidden w-full overflow-hidden bg-[#005CAB] lg:flex lg:w-3/5 lg:items-center lg:justify-center lg:p-12">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury bus"
            className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
          />

          <div className="relative z-10 flex max-w-xl flex-col gap-6 text-white">
            <div className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <i className="fas fa-map-marked-alt mr-2 text-sm text-[#D5E3FF]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Premium Travel Experience
              </span>
            </div>

            <h1 className="max-w-md pt-2 text-4xl xl:text-6xl font-extrabold leading-tight">
              Travel Smarter,
              <br />
              Every Journey.
            </h1>

            <p className="text-base xl:text-xl text-white/80">
              Access your account to manage bookings, track routes, and enjoy a
              seamless travel experience.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl xl:text-3xl font-semibold">500+</div>

                <div className="text-xs text-white/60">Routes Daily</div>
              </div>

              <div>
                <div className="text-2xl xl:text-3xl font-semibold">2M+</div>

                <div className="text-xs text-white/60">Happy Riders</div>
              </div>

              <div>
                <div className="text-2xl xl:text-3xl font-semibold">24/7</div>

                <div className="text-xs text-white/60">Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center px-4 py-6 sm:px-6 sm:py-10 lg:w-2/5 lg:px-12">
          <div className="w-full max-w-md space-y-6 sm:space-y-8">
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#005CAB] text-white shadow-lg">
                <i className="fas fa-bus text-sm sm:text-lg" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#005CAB]">
                  FastX
                </h1>

                <p className="text-xs sm:text-sm text-[#707785]">
                  Online Bus Ticket Booking
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1B1C1C]">
                Welcome Back
              </h2>

              <p className="text-sm sm:text-base text-[#404754]">
                Please enter your details to sign in.
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

            <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
              {errors.api && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errors.api}
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-[#1B1C1C]">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`mt-2 h-12 sm:h-14 w-full rounded-2xl border px-4 text-sm sm:text-base focus:outline-none ${
                    errors.email ? "border-red-500" : "border-slate-200"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#1B1C1C]">
                  Password
                </label>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`h-12 sm:h-14 w-full rounded-2xl border px-4 text-sm sm:text-base focus:outline-none ${
                      errors.password ? "border-red-500" : "border-slate-200"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
                  >
                    <i
                      className={
                        showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    />
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="text-right text-sm">
                <button type="button" className="text-[#005CAB] font-semibold">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`flex h-12 sm:h-14 w-full items-center justify-center gap-2 rounded-2xl text-sm sm:text-base font-bold text-white transition-all duration-300 ${
                  isFormValid
                    ? "bg-linear-to-r from-[#005CAB] to-[#0075D7]"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-arrow-right-to-bracket" />
                    Log In as {selectedRole}
                  </>
                )}
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-slate-200" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-[#FBF9F9] px-4 text-sm text-slate-500">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-3 rounded-2xl border border-red-400 bg-white px-8 py-4 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <i className="fab fa-google text-lg text-red-500" />
                  Google
                </button>
              </div>
            </form>

            <div className="text-center text-sm sm:text-base">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-[#005CAB] font-bold">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
