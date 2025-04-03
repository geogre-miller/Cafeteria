import React from "react";
import coffee from "../assets/coffee.svg";
import restaurant from "../assets/restaurant.svg";
import couple from "../assets/couple.svg";

const Sidebar = () => {
  return (
    <>
      <div className="w-1/6 h-screen bg-background/95 flex-col shadow-xl rounded-r-lg">
        <div className="flex items-center justify-start m-2 text-xl font-bold p-2">
          Me<span className="text-red-500">n</span>u
        </div>
        <div className="flex items-center justify-start m-2 px-4  py-2 cursor-pointer rounded-md hover:bg-slate-100">
          <img src={coffee} alt="coffee" className="w-6 h-6" />
          <span className="pl-2">Cafe</span>
        </div>
        <div className="flex items-center justify-start m-2  px-4  py-2 cursor-pointer rounded-md hover:bg-slate-100">
          <img src={restaurant} alt="cafe" className="w-6 h-6" />
          <span className="pl-2">Nhà hàng</span>
        </div>
        <div className="flex items-center justify-start m-2  px-4  py-2 cursor-pointer rounded-md hover:bg-slate-100">
          <img src={couple} alt="location" className="w-6 h-6" />
          <span className="pl-2">Địa điểm</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
