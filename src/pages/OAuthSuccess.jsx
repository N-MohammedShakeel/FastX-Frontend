import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");

    if (!token || !role) {
      navigate("/signin");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    localStorage.setItem("userEmail", decodedToken.sub);

    if (role === "PASSENGER") {
      navigate("/passenger-dashboard");
    } else if (role === "OPERATOR") {
      navigate("/operator-dashboard");
    } else {
      navigate("/admin-dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF9F9]">
      <div className="text-center">
        <div className="h-14 w-14 border-4 border-[#005CAB] border-t-transparent rounded-full animate-spin mx-auto"></div>

        <p className="mt-4 text-[#404754] font-medium">
          Completing Google Login...
        </p>
      </div>
    </div>
  );
}
