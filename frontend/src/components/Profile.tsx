import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
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
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
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
            {/* {user ? user.name : "Cá nhân"} */}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to="/profile">
              <DropdownMenuItem className="hover:bg-gray-100">
                <User />
                <span className="cursor-pointer">Profile</span>
              </DropdownMenuItem>
            </Link>

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
  );
};

export default Profile;
