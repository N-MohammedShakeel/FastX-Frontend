import React, { useEffect } from "react";
import { FaUsers, FaBus, FaRoute, FaTicketAlt, FaWallet } from "react-icons/fa";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/common/StatCard";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import {
  fetchPassengers,
  fetchOperators,
  fetchAdminRoutes,
  fetchAdminBookings,
} from "../../store/admin/admin-actions";

const revenueData = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 180000 },
  { month: "Mar", revenue: 140000 },
  { month: "Apr", revenue: 220000 },
  { month: "May", revenue: 260000 },
  { month: "Jun", revenue: 310000 },
];

const bookingData = [
  { day: "Mon", bookings: 120 },
  { day: "Tue", bookings: 190 },
  { day: "Wed", bookings: 240 },
  { day: "Thu", bookings: 210 },
  { day: "Fri", bookings: 330 },
  { day: "Sat", bookings: 410 },
  { day: "Sun", bookings: 290 },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const passengers = useSelector((state) => state.adminPassenger.passengers);
  const operators = useSelector((state) => state.adminOperator.operators);
  const routes = useSelector((state) => state.adminRoute.routes);
  const bookings = useSelector((state) => state.adminBooking.bookings);

  const passengerLoading = useSelector((state) => state.adminPassenger.loading);
  const operatorLoading = useSelector((state) => state.adminOperator.loading);
  const routeLoading = useSelector((state) => state.adminRoute.loading);
  const bookingLoading = useSelector((state) => state.adminBooking.loading);

  const passengerError = useSelector((state) => state.adminPassenger.error);
  const operatorError = useSelector((state) => state.adminOperator.error);
  const routeError = useSelector((state) => state.adminRoute.error);
  const bookingError = useSelector((state) => state.adminBooking.error);

  useEffect(() => {
    dispatch(fetchPassengers());
    dispatch(fetchOperators());
    dispatch(fetchAdminRoutes());
    dispatch(fetchAdminBookings());
  }, [dispatch]);

  const loading =
    passengerLoading || operatorLoading || routeLoading || bookingLoading;
  const error = passengerError || operatorError || routeError || bookingError;

  if (loading) {
    return (
      <AdminLayout>
        <Loading message="Loading dashboard..." />
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Error message={error} />
      </AdminLayout>
    );
  }

  const totalRevenue = bookings
    .filter((booking) => booking.status === "CONFIRMED")
    .reduce((sum, booking) => sum + booking.totalFare, 0);

  const totalCancelledBookings = bookings.filter(
    (booking) => booking.status === "CANCELLED",
  ).length;

  const totalAssignedRoutes = routes.filter((route) => route.assigned).length;

  const stats = [
    {
      title: "Total Passengers",
      value: passengers.length,
      footer: "Registered Users",
      icon: <FaUsers />,
      iconBg: "bg-blue-50",
      iconColor: "text-[#005CAB]",
    },

    {
      title: "Operators",
      value: operators.length,
      footer: "Active Operators",
      icon: <FaBus />,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },

    {
      title: "Routes",
      value: routes.length,
      footer: `${totalAssignedRoutes} Assigned`,
      icon: <FaRoute />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },

    {
      title: "Bookings",
      value: bookings.length,
      footer: `${totalCancelledBookings} Cancelled`,
      icon: <FaTicketAlt />,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor platform activity, bookings, operators, and routes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              value={item.value}
              footer={item.footer}
              icon={item.icon}
              iconBg={item.iconBg}
              iconColor={item.iconColor}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Revenue Overview
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Monthly platform revenue
                </p>
              </div>

              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <FaWallet />₹{totalRevenue.toLocaleString()}
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#005CAB" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#005CAB" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#005CAB"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Platform Summary
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Overall booking analytics
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">
                <FaWallet />
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-5xl font-black text-slate-900">
                ₹{totalRevenue.toLocaleString()}
              </h1>

              <p className="text-green-600 font-semibold mt-3">
                Total confirmed revenue
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Confirmed Bookings</span>

                <span className="font-bold text-slate-900">
                  {
                    bookings.filter((booking) => booking.status === "CONFIRMED")
                      .length
                  }
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Cancelled Bookings</span>

                <span className="font-bold text-slate-900">
                  {totalCancelledBookings}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Active Routes</span>

                <span className="font-bold text-slate-900">
                  {totalAssignedRoutes}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Weekly Bookings
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Daily booking activity
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="bookings"
                  radius={[10, 10, 0, 0]}
                  fill="#005CAB"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
