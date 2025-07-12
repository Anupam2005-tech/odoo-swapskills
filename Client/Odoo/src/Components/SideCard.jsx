import React from "react";
import { Meteors } from "../reuseableComponents/Metaroid";
import { Link } from "react-router-dom";

export default function SideCard() {
  return (
    <div className="">
      <div className="absolute bottom-6 right-6 z-50 w-full max-w-xl">
        {/* Glow effect background */}
        <div
          className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-gradient-to-r from-sky-500 to-teal-400 blur-3xl"
        />

        {/* Card content */}
        <div
          className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl"
        >
          {/* Decorative icon */}
          <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
  Connect. Learn. Grow.
</h1>

<p className="relative z-50 mb-4 text-base font-normal text-slate-400">
  Join like-minded individuals exchanging real-world skills.
  Share what you know, learn what you love — and grow together through
  collaboration, mentorship, and curiosity.
</p>

<Link to={'/login'}><button className=" cursor-pointer rounded-lg border border-gray-500 px-4 py-1 text-gray-300 hover:bg-gray-800 transition-all">
  Join the Movement
</button></Link>

          {/* Meteors effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}