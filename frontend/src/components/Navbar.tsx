import React from "react";
import logo from "../assets/logo.png";
import SearchBar from "./ui/SearchBar";
import Profile from "./Profile";

const Navbar = () => {
  return (
    <div className="w-full h-20 flex justify-between sticky shadow-md border-grid top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-center p-3 m-3">
        <img src={logo} alt="logo" className="w-15 h-15" />
      </div>
      <div className="flex items-center justify-center">
        <SearchBar />
      </div>
      <div className="flex items-center mr-10 gap-2">
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
