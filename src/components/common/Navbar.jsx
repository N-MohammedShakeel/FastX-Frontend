import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="w-full h-17 sticky top-0 z-50 backdrop-blur-md bg-[#FBF9F9]/80 shadow-sm">
      <div className="mx-auto h-full flex items-center px-4 md:px-8 justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-extrabold text-[#005CAB] tracking-tight">
            FastX
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex flex-col gap-1 p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <span className="w-6 h-1 bg-[#005CAB] rounded"></span>
            <span className="w-5 h-1 bg-[#005CAB] rounded"></span>
            <span className="w-6 h-1 bg-[#005CAB] rounded"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
