import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "./api/authApi";

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.log("SignIn Failed: ", error.message);
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
