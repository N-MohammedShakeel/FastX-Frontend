const Sidebar = ({ isOpen, onClose, children }) => {
  return (
    <>
      <aside className="hidden lg:flex flex-col justify-between w-64 h-[calc(100vh-68px)] sticky top-17 bg-[#F8FAFC] px-3 py-6 border-r border-slate-200">
        {children}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

          <div className="relative w-64 h-full bg-[#F8FAFC] px-3 py-6 border-r border-slate-200">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
