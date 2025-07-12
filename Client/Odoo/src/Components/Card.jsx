import React from "react";
import { WobbleCard } from "../reuseableComponents/WobbleCard";

const Card = () => {
  return (
    <>
      <div className="flex justify-start px-4 py-6 w-full">
        <WobbleCard
          containerClassName="w-full max-w-3xl bg-neutral-900 text-white relative rounded-xl shadow-lg min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
          className=""
        >
          <div className="max-w-sm p-6">
            <h2 className="text-left text-balance text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
              Gippity AI powers the entire universe
            </h2>
            <p className="mt-4 text-left text-base text-neutral-300">
              With over 100,000 monthly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
          <img
            src="/linear.webp"
            width="400"
            height="400"
            alt="linear demo image"
            className="absolute -right-10 bottom-0 object-contain rounded-2xl opacity-80 grayscale hidden md:block "
          />
        </WobbleCard>
      </div>
    </>
  );
};

export default Card;