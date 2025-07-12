import React from "react";
import Card from "./card";
import { Globe } from "./globe";

const SecondDiv = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-black h-auto px-4 py-4 gap-8">
      <div className="w-full lg:w-1/2 flex justify-center lg:-mt-8">
        <Card />
      </div>

      <div className="hidden lg:block h-96 w-[1px] bg-gray-600"></div>

      <div className="w-full lg:w-1/2 flex justify-center">
        <Globe />
      </div>
    </div>
  );
};

export default SecondDiv;