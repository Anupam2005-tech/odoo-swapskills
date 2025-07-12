import React from "react";
import { WobbleCard } from "../reuseableComponents/WobbleCard";

const Card = () => {
  return (
    <div className="flex justify-start px-4 py-6 w-full">
      <WobbleCard
        containerClassName="w-full max-w-3xl bg-neutral-900 text-white relative rounded-xl shadow-lg min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
      >
        <div className="max-w-sm p-6">
          <h2 className="text-left text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Learn Fast. Teach Freely. Grow Together.
          </h2>
          <p className="mt-4 text-left text-base text-neutral-300">
            Break the boundaries of conventional learning. SkillSwap connects passionate learners and mentors to trade knowledge — one skill at a time.
          </p>
          <p className="mt-2 text-left text-base text-neutral-400">
            No cost. No clutter. Just real people with real skills, building each other up in a global learning community.
          </p>
        </div>
      </WobbleCard>
    </div>
  );
};

export default Card;