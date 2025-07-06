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
import { useGetProfileUser, useSignOut } from "@/services/authServices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

export function PersonDropDown() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutateAsync: logoutMutate } = useSignOut();
  const { data: userProfile } = useGetProfileUser();
  const handleLogout = async () => {
    try {
      await logoutMutate();
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
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {userProfile?.data?.avatar !== "" ? (
          <Avatar className="hover:cursor-pointer">
            <AvatarImage
              src={userProfile?.data?.avatar}
              className="w-full h-full object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <UserIcon
            className="size-7 bg-amber-400 text-white hover:bg-gray-200 rounded-full p-1 hover:cursor-pointer"
            aria-describedby="login"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <Link href={"/profile"}>
          <DropdownMenuItem className="hover:cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>

        <Link href={"/myorder"}>
          <DropdownMenuItem className="hover:cursor-pointer">
            {" "}
            My Order History
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          onClick={() => handleLogout()}
          className="hover:cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
