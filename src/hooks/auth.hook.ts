import { loginUser, registerUser } from "@/services/Auth";
import { useMutation } from "@tanstack/react-query";
import { FormikValues } from "formik";
import toast from "react-hot-toast";

export const useUserRegistration = () => {
	return useMutation<any, Error, FormikValues>({
		mutationKey: ["USER_REGISTRATION"],
		mutationFn: async (userData) => await registerUser(userData),
		onSuccess: () => {
			toast.success("User registration successful.");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

export const useUserLogin = () => {
	return useMutation<any, Error, FormikValues>({
		mutationKey: ["USER_LOGIN"],
		mutationFn: async (userData) => await loginUser(userData),
		onSuccess: () => {
			toast.success("User login successful.");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};
