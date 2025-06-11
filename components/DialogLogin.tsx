import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import Link from "next/link";
const DialogLogin = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild className="cursor-pointer">
          <Label>Sign In</Label>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Sign In</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Username</Label>
              <Input
                id="password"
                name="password"
                placeholder="*********"
                type="password"
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-col w-full gap-3">
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </DialogFooter>
          <Separator />
          <div className="flex items-center justify-center">
            <Label className="text-center text-gray-500 font-normal">
              No account ?
              <DialogClose asChild>
                <Link
                  href="/signup"
                  className="underline font-semibold text-black"
                >
                  SignUp
                </Link>
              </DialogClose>
            </Label>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default DialogLogin;
