import React from "react";

const LandingFooter = () => {
  return (
    <footer className="border-t border-slate-200/60 bg-[#EFEDED] py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-2xl font-black tracking-tight text-slate-900">
            FastX
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Seamless journeys, premium comfort.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#">About</a>
          <a href="#">Routes</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FBF9F9] text-slate-500">
            <i className="fab fa-twitter text-[18px]"></i>
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FBF9F9] text-slate-500">
            <i className="fab fa-facebook-f text-[18px]"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
