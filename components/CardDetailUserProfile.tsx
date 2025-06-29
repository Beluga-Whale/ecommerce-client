import { UserProfileDTO } from "@/types";
import dayjs from "dayjs";

type CardDetailUserProfileProps = {
  userProfile: UserProfileDTO | undefined;
};

const CardDetailUserProfile = ({ userProfile }: CardDetailUserProfileProps) => {
  return (
    <div className="bg-white w-full p-6 rounded-lg shadow-sm mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-xs text-gray-400 mb-1">FirstName - LastName</p>
          <p className="font-medium">
            {userProfile?.firstName} {userProfile?.lastName}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Email</p>
          <p className="font-medium">{userProfile?.email}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Phone</p>
          <p className="font-medium">{userProfile?.phone ?? "-"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">BirthDate</p>
          <p className="font-medium">
            {dayjs(userProfile?.birthDate).format("DD MM YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CardDetailUserProfile;
