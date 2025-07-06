import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  signIn,
  signOut,
  signUp,
  updateProfile,
} from "./api/authApi";
import { userProfileResponse, userProfileUpdateDTO } from "@/types";

const getUserProfileQueryKey = "getUserProfileQueryKey";

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.log("SignIn Failed: ", error.message);
    },
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.log("SignOut Failed: ", error.message);
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.log("SignUp Failed: ", error.message);
    },
  });
};

export const useGetProfileUser = () => {
  return useQuery<userProfileResponse>({
    queryKey: [getUserProfileQueryKey],
    queryFn: getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: userProfileUpdateDTO) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getUserProfileQueryKey],
      });
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({
        queryKey: [getUserProfileQueryKey],
      });
      console.log("SignIn Failed: ", error.message);
    },
  });
};
