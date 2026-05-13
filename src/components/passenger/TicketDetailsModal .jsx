import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import ETicket from "./ETicket";
import { toast } from "react-toastify";

const TicketDetailsModal = ({ isOpen, onClose, booking }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef(null);

  if (!isOpen || !booking) return null;

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      const element = printRef.current;
      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`FastX_Ticket_${booking.bookingId}.pdf`);

      toast.success("E-Ticket downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const statusColors = {
    confirmed: "text-green-600",
    completed: "text-blue-600",
    processing: "text-orange-500",
    cancelled: "text-red-600",
  };

  const qrValue = `ID:${booking.bookingId}|P:${booking.passengerName}|S:${booking.seatNumbers?.join(",")}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col">
          <div className="bg-[#005CAB] text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold tracking-tight">FastX Travels</h2>
            <div className="text-right">
              <p className="text-[10px] opacity-80 uppercase">Ticket ID</p>
              <p className="text-xs font-mono font-bold">
                FX-{booking.bookingId}
              </p>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between gap-4 px-2">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 uppercase">From</p>
                <p className="font-bold text-lg leading-none">
                  {booking.origin}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(booking.departureTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex flex-col items-center px-4 flex-1">
                <div className="w-full flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#005CAB]"></div>
                  <div className="flex-1 h-px border-t border-dashed border-gray-300"></div>
                  <i className="fa-solid fa-bus text-[#005CAB] text-xs"></i>
                  <div className="flex-1 h-px border-t border-dashed border-gray-300"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#005CAB]"></div>
                </div>
                <p className="text-[9px] text-gray-400 mt-1 uppercase font-bold">
                  {booking.busName}
                </p>
              </div>

              <div className="flex-1 text-right">
                <p className="text-[10px] text-gray-400 uppercase">To</p>
                <p className="font-bold text-lg leading-none">
                  {booking.destination}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(booking.arrivalTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="col-span-1">
                <p className="text-[9px] text-gray-400 uppercase">Passenger</p>
                <p className="text-xs font-bold truncate">
                  {booking.passengerName}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase">Seat</p>
                <p className="text-xs font-bold">
                  {booking.seatNumbers?.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase">Bus No</p>
                <p className="text-xs font-bold">{booking.busNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-400 uppercase">Status</p>
                <p
                  className={`text-[9px] font-bold uppercase ${statusColors[booking.status.toLowerCase()] || "text-gray-600"}`}
                >
                  {booking.status}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleDownloadPDF}
                className="flex-1 py-2 rounded-lg bg-[#005CAB] text-white text-xs font-bold"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                    Generating PDF...
                  </span>
                ) : (
                  "Download E-Ticket"
                )}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold"
              >
                Close
              </button>
            </div>
            <div
              style={{
                position: "absolute",
                top: "-9999px",
                left: "-9999px",
                width: "800px",
              }}
            >
              <ETicket ref={printRef} booking={booking} />
            </div>
          </div>
        </div>

        <div className="w-full md:w-48 bg-gray-50 border-l border-dashed border-gray-200 flex flex-col items-center justify-center p-6 relative">
          <div className="p-2 bg-white border border-gray-200 rounded-xl shadow-sm">
            <QRCode.default
              value={qrValue}
              size={110}
              style={{ height: "auto", maxWidth: "110px", width: "100%" }}
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">
              Boarding Pass
            </p>
            <p className="text-[9px] text-gray-400 mt-1 leading-tight">
              Present this QR for
              <br />
              ticket validation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;
