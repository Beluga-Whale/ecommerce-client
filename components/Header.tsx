"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DialogLogin from "./Dialog/DialogLogin";
import { PersonDropDown } from "./PersonDropDown";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/lib/clearCookie";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { setDialogLoginOpen } from "@/lib/features/dialog/dialogSlice";
import PopupCart from "./PopupCart";
import { setUserId } from "@/lib/features/user/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useGetProfileUser, useSignOut } from "@/services/authServices";

type HeaderProps = {
  cookie: string | undefined;
};

const navigation = {
  menu: [
    {
      name: "Shop",
      href: "/shop",
    },
    {
      name: "Cart",
      href: "/shop/order",
    },
    {
      name: "Profile",
      href: "/profile",
    },
  ],
};

const Header = ({ cookie }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data: userProfile } = useGetProfileUser();
  const router = useRouter();
  const { mutateAsync: logoutMutate } = useSignOut();
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
    <div className="bg-white sticky top-0 z-10 ">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.menu.map((page, index) => (
                <div key={index} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                {/* NOTE- Login */}
                {cookie == "" || cookie == undefined ? (
                  <Label
                    onClick={() => dispatch(setDialogLoginOpen())}
                    className="w-11 hover:cursor-pointer hover:bg-gray-200 p-1"
                  >
                    Login
                  </Label>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="hover:cursor-pointer">
                        <AvatarImage
                          src={userProfile?.data?.avatar}
                          className="w-full h-full object-cover"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-semibold">
                        {userProfile?.data?.firstName}{" "}
                        {userProfile?.data?.lastName}
                      </p>
                    </div>
                    <div>
                      <Link href={"/myorder"} className="font-semibold">
                        Order History
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="flow-root">
                {cookie == "" || cookie == undefined ? null : (
                  <Label
                    onClick={() => handleLogout()}
                    className="-m-2 block p-2 font-medium text-gray-900 hover:cursor-pointer"
                  >
                    Logout
                  </Label>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-amber-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl   px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <span className="sr-only">Your Company</span>
                  <p className="text-xl font-bold">BELUGA</p>
                </Link>
              </div>

              {cookie == "" || cookie == undefined ? null : (
                <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8 justify-center items-center">
                    <Link href={"/shop"} className="font-semibold">
                      Shop
                    </Link>
                    <Link href={"/shop/order"} className="font-semibold">
                      Cart
                    </Link>
                    <Link href={"/profile"} className="font-semibold">
                      Profile
                    </Link>
                  </div>
                </div>
              )}

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6  ">
                  {/* NOTE - Login */}
                  {cookie == "" || cookie == undefined ? (
                    <UserIcon
                      onClick={() => dispatch(setDialogLoginOpen())}
                      className="size-7 hover:cursor-pointer hover:bg-gray-200 rounded-full p-1 "
                      aria-describedby="login"
                      data-testid="login-icon"
                    />
                  ) : (
                    <PersonDropDown />
                  )}
                </div>

                {/* Cart*/}
                <div className="ml-4 flow-root lg:ml-6">
                  <PopupCart />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <DialogLogin />
    </div>
  );
};
export default Header;
