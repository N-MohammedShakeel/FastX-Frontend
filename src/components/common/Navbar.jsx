import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="w-full h-17 sticky top-0 z-50 backdrop-blur-md bg-[#FBF9F9]/80 shadow-sm">
      <div className="mx-auto h-full flex items-center px-4 ms-4">
        <h1 className="text-2xl font-extrabold text-[#005CAB] tracking-tight">
          FastX
        </h1>
      </div>
    </header>
  );
};

export default Navbar;
