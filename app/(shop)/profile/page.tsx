"use client";

import { Button } from "@/components/ui/button";
import { useGetProfileUser } from "@/services/authServices";
import { UserIcon, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetOrderAllByUserId } from "@/services/orderService";
import CardStatus from "@/components/CardStatus";
import CardDetailUserProfile from "@/components/CardDetailUserProfile";
const ProfilePage = () => {
  const { data: userProfile } = useGetProfileUser();
  const router = useRouter();

  const { data: orderAll } = useGetOrderAllByUserId();
  const statusPending = orderAll?.data?.filter(
    (item) => item?.status == "pending"
  );
  const statusPaid = orderAll?.data?.filter((item) => item?.status == "paid");
  const statusCancel = orderAll?.data?.filter(
    (item) => item?.status == "cancel"
  );
  const statusShipped = orderAll?.data?.filter(
    (item) => item?.status == "shipped"
  );
  const statusComplete = orderAll?.data?.filter(
    (item) => item?.status == "complete"
  );

  return (
    <div className="bg-gray-100 min-h-screen pt-6">
      <div className="mx-auto max-w-7xl px-6 ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-4">
            <UserRound className="text-amber-500" />
            <p className="text-xl font-bold">Personal Information</p>
          </div>
          <div>
            <Button
              className="bg-amber-100 text-amber-500  hover:bg-amber-500 hover:text-white hover:cursor-pointer "
              onClick={() => router.push("/profile/edit")}
            >
              Edit Personal Information
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center my-6">
          {userProfile?.data?.avatar !== "" ? (
            <div className="flex items-center space-x-3">
              <Avatar className="w-16 h-16 rounded-full ">
                <AvatarImage
                  src={userProfile?.data?.avatar}
                  className="w-full h-full object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{userProfile?.data?.firstName}</p>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <UserIcon
                className="size-7 bg-amber-400 w-16 h-16 text-white  rounded-full p-1 "
                aria-describedby="login"
              />
              <p>{userProfile?.data?.firstName}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <CardStatus
            order={statusPending?.length ?? 0}
            statusTitle="Pending"
          />
          <CardStatus order={statusPaid?.length ?? 0} statusTitle="Paid" />
          <CardStatus
            order={statusShipped?.length ?? 0}
            statusTitle="Shipped"
          />
          <CardStatus
            order={statusComplete?.length ?? 0}
            statusTitle="Complete"
          />
          <CardStatus order={statusCancel?.length ?? 0} statusTitle="Cancel" />
        </div>
        <CardDetailUserProfile userProfile={userProfile?.data} />
      </div>
    </div>
  );
};
export default ProfilePage;
