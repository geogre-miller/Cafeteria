import React from "react";
import logo from "../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import SearchBar from "./ui/SearchBar";
import { User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel className="border-b border-gray-200 py-2">
              Cá nhân
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-gray-100">
                <User />
                <span className="cursor-pointer">Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="hover:bg-gray-100">
                <Settings />
                <span className="cursor-pointer">Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-b border-gray-200 pt-1" />
              <DropdownMenuItem className="hover:bg-gray-100">
                <LogOut />
                <span className="cursor-pointer">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
