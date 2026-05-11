import React from "react";
import { Link } from "react-router-dom";

const LandingNavBar = () => {
  const items = [
    { name: "Home", href: "#hero", current: true },
    { name: "Routes", href: "#popular", current: false },
    { name: "Offers", href: "#offers", current: false },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        <div className="text-2xl font-bold tracking-tight text-slate-900">
          FastX
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold ${item.current ? "text-[#005CAB]" : "text-slate-600 hover:text-slate-900"}`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link to="/signup">
            <button className="flex items-center gap-2 rounded-full bg-[#0862b1] border-0 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-white hover:text-[#0862b1] hover:border-[#0862b1] hover:border-2">
              Sign Up
            </button>
          </Link>
          <Link to="/signin">
            <button className="flex items-center gap-2 rounded-full bg-white border-[#005CAB] border-2 text-[#005CAB] px-5 py-2 text-sm font-semiboldshadow-sm transition hover:bg-[#005CAB] hover:text-white">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingNavBar;
