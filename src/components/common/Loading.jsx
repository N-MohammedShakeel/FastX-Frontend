const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="h-12 w-12 border-4 border-[#005CAB] border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-slate-500 font-medium">{message}</p>
    </div>
  );
};

export default Loading;
