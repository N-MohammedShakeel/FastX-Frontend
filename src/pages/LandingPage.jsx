import React from "react";
import PopularRoutesCard from "../components/landing/PopularRoutesCard";
import LandingNavBar from "../components/landing/LandingNavBar";
import LandingFooter from "../components/landing/LandingFooter";

const LandingPage = () => {
  const routes = [
    {
      title: "London to Paris",
      tag: "Popular",
      duration: "6 hrs",
      price: "From £49",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
      tagColor: "bg-blue-100 text-slate-600",
    },
    {
      title: "Paris to Lyon",
      tag: "Express",
      duration: "4 hrs",
      price: "From £39",
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
      tagColor: "bg-blue-100 text-slate-600",
    },
    {
      title: "Berlin to Prague",
      tag: "Limited",
      duration: "5 hrs",
      price: "From £44",
      image:
        "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1200&auto=format&fit=crop",
      tagColor: "bg-red-600 text-white",
    },
    {
      title: "Madrid to Porto",
      tag: "Comfort",
      duration: "7 hrs",
      price: "From £52",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
      tagColor: "bg-blue-100 text-slate-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F9] text-slate-900 scroll-smooth">
      <LandingNavBar />

      <section
        id="hero"
        className="mx-auto flex flex-col lg:flex-row max-w-7xl gap-14 px-6 py-24 items-center"
      >
        <div className="max-w-3xl flex-1">
          <h1 className="max-w-3xl text-5xl font-extrabold leading-none tracking-[-0.04em] text-slate-900 md:text-7xl">
            Travel that <span className="text-[#005CAB]">flows</span> with you.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Experience seamless coach travel across Europe with premium comfort,
            flexible bookings, and routes designed around your schedule.
          </p>
        </div>

        <div className="relative flex-1">
          <div className="rotate-2 overflow-hidden rounded-[48px] shadow-2xl">
            <div className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury Bus"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="absolute -bottom-6 -left-8 flex items-center gap-4 rounded-3xl border border-slate-200/20 bg-white p-6 shadow-2xl">
            <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
              <i className="fas fa-sliders-h text-[20px]"></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">4.9★</div>
              <div className="text-sm font-medium text-slate-500">
                Average rider rating
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="popular" className="bg-[#F5F3F3] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#005CAB]">
                Most booked
              </p>
              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                Popular Routes
              </h2>
            </div>

            <button className="flex items-center gap-2 text-base font-semibold text-[#005CAB] hover:underline">
              View all routes
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {routes.map((route) => (
              <PopularRoutesCard key={route.title} route={route} />
            ))}
          </div>
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-12 text-center text-4xl font-bold text-slate-900">
          Exclusive Offers & Promotions
        </h2>

        <div className="grid gap-8 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative overflow-hidden rounded-4xl lg:col-span-2 lg:row-span-1 min-h-100">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
              alt="Weekend getaway"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-transparent" />

            <div className="absolute flex h-full max-w-lg flex-col justify-end p-12 text-white">
              <span className="mb-4 w-fit rounded-full bg-[#005CAB] px-4 py-1 text-xs font-bold uppercase tracking-[0.15em]">
                Limited Time Offer
              </span>

              <h3 className="text-4xl font-extrabold leading-tight">
                Weekend Getaway? Get 40% Off!
              </h3>

              <p className="mt-6 text-lg leading-7 text-white/80">
                Use code VELOCITY40 for your next trip booking between Friday
                and Sunday.
              </p>

              <button className="mt-8 w-fit rounded-full bg-white px-8 py-3 font-bold text-[#005CAB] transition hover:bg-slate-100">
                Book Now
              </button>
            </div>
          </div>

          <div className="flex min-h-80 flex-col justify-between rounded-[40px] bg-[#005CAB] p-10 text-white">
            <div>
              <div className="mb-6 text-3xl">🎓</div>
              <h3 className="text-3xl font-bold leading-tight">
                Student Loyalty
              </h3>
              <p className="mt-6 text-base leading-7 text-white/70">
                Verify your ID and get a flat 15% discount on all international
                routes.
              </p>
            </div>

            <button className="w-fit border-b-2 border-white pb-1 text-base font-bold">
              Learn More
            </button>
          </div>

          <div className="flex min-h-78 flex-col justify-between rounded-[40px] bg-[#CF442C] p-10 text-white">
            <div>
              <div className="mb-6 text-3xl">👥</div>
              <h3 className="text-3xl font-bold leading-tight">
                Refer a Friend
              </h3>
              <p className="mt-6 text-base leading-7 text-white/70">
                Invite a friend to travel with FastX and you both get a £10
                travel credit.
              </p>
            </div>

            <button className="w-fit border-b-2 border-white pb-1 text-base font-bold">
              Refer
            </button>
          </div>

          <div className="flex min-h-82 flex-col items-center justify-between gap-8 rounded-[40px] bg-[#D6E4F9] p-10 lg:col-span-2 lg:flex-row">
            <div className="max-w-md">
              <h3 className="text-3xl font-bold leading-tight text-[#0F1C2C]">
                First Trip? The Coffee&apos;s On Us.
              </h3>
              <p className="mt-5 text-base leading-7 text-slate-700">
                Book your first trip with FastX and receive a complimentary
                beverage voucher at any of our partner terminals.
              </p>

              <button className="mt-8 rounded-full bg-[#005CAB] px-8 py-3 font-bold text-white transition hover:bg-blue-700">
                Claim Offer
              </button>
            </div>

            <div className="flex h-48 w-48 items-center justify-center rounded-full border-4 border-white/20 bg-white/40">
              <div className="text-6xl">☕</div>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
