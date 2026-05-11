const Seat = ({ seat, onSelect, selectedSeats = [] }) => {
  if (!seat) return <div />;

  const isSelected = selectedSeats.includes(seat.id);

  const colors = {
    available: "bg-green-600",
    selected: "bg-[#005CAB]",
    booked: "bg-gray-300 cursor-not-allowed",
  };

  const currentStatus = isSelected ? "selected" : seat.status;

  const isSleeper = seat.type === "sleeper";

  return (
    <button
      disabled={seat.status === "booked"}
      onClick={() => onSelect(seat.id)}
      className={`
        ${isSleeper ? "w-10 h-16" : "w-10 h-10"} 
        rounded-lg text-white text-xs font-bold flex items-center justify-center
        ${colors[currentStatus]} transition
      `}
    >
      {seat.id}
    </button>
  );
};

export default Seat;
