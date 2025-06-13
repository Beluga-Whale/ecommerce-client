"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DialogLogin from "./DialogLogin";
import { PersonDropDown } from "./PersonDropDown";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/lib/clearCookie";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { setDialogLoginOpen } from "@/lib/features/dialog/dialogSlice";

type HeaderProps = {
  cookie: string | undefined;
};

const navigation = {
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
  menu: [
    {
      name: "Feature TEST",
      href: "#",
    },
  ],
};

const Header = ({ cookie }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const handleLogout = async () => {
    await deleteCookie();
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
    <div className="bg-white sticky top-0 ">
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
              {navigation.menu.map((page) => (
                <div key={page.name} className="flow-root">
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
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
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
                  <UserIcon
                    onClick={() => dispatch(setDialogLoginOpen())}
                    className="size-7 hover:cursor-pointer hover:bg-gray-200 rounded-full p-1 "
                    aria-describedby="login"
                  />
                ) : (
                  <Label className="-m-2 block p-2 font-medium text-gray-900">
                    Profile
                  </Label>
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
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
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
                  {/* <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  /> */}
                </Link>
              </div>

              {/* Flyout menus */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8 justify-center items-center">
                  <p>Feature TEST</p>
                  <p>Feature TEST</p>
                </div>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {/* NOTE - Login */}
                  {cookie == "" || cookie == undefined ? (
                    <UserIcon
                      onClick={() => dispatch(setDialogLoginOpen())}
                      className="size-7 hover:cursor-pointer hover:bg-gray-200 rounded-full p-1 "
                      aria-describedby="login"
                    />
                  ) : (
                    <PersonDropDown />
                  )}
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
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
