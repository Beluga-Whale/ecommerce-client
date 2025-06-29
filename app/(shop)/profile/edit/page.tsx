"use client";
import ProfileFormEdit from "@/components/ProfileFormEdit";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const EditPersonalPage = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        <div className="py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <UserRound className="text-amber-500" />
              <p className="text-xl font-bold">Edit Personal Information</p>
            </div>
            <div>
              <Button
                className="bg-amber-100 text-amber-500  hover:bg-amber-500 hover:text-white hover:cursor-pointer "
                onClick={() => router.push("/profile")}
              >
                Back To Personal Information Page
              </Button>
            </div>
          </div>
          <div className="mx-auto max-2xl bg-white rounded-2xl">
            <ProfileFormEdit />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditPersonalPage;
