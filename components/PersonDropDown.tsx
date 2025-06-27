import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCookie } from "@/lib/clearCookie";
import { setUserId } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";

import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

export function PersonDropDown() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await deleteCookie();
    dispatch(setUserId(undefined));
    router.refresh();
    toast.success("Logged out successfully.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserIcon
          className="size-7 bg-amber-400 text-white hover:cursor-pointer hover:bg-gray-200 rounded-full p-1 "
          aria-describedby="login"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>

        <Link href={"/myorder"} className="hover:cursor-pointer">
          <DropdownMenuItem>My Order History</DropdownMenuItem>
        </Link>

        <DropdownMenuItem onClick={() => handleLogout()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
