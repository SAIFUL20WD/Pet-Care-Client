"use client";

import { updateUserProfile } from "@/services/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormikValues } from "formik";
import toast from "react-hot-toast";

export const useUpdateUserProfile = () => {
	return useMutation<any, Error, FormikValues>({
		mutationKey: ["UPDATE_USER_PROFILE"],
		mutationFn: async (postData) => await updateUserProfile(postData),
		onSuccess: () => {
			toast.success("User profile updated successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};
