"use client";

import { createPost, updatePost } from "@/services/post";
import { useMutation } from "@tanstack/react-query";
import { FormikValues } from "formik";
import { toast } from "react-hot-toast";

export const useCreatePost = () => {
	return useMutation<any, Error, FormikValues>({
		mutationKey: ["CREATE_POST"],
		mutationFn: async (postData) => await createPost(postData),
		onSuccess: () => {
			toast.success("Blog created successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

export const useUpdatePost = () => {
	return useMutation<any, Error, FormikValues>({
		mutationKey: ["UPDATE_POST"],
		mutationFn: async (postData) => await updatePost(postData),
		onSuccess: () => {
			toast.success("Blog updated successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

// export const useDeletePost = () => {
// 	return useMutation<any, Error, string>({
// 		mutationKey: ["DELETE_POST"],
// 		mutationFn: async (postId) => await deletePost(postId),
// 		onSuccess: () => {
// 			toast.success("Blog deleted successfully");
// 		},
// 		onError: (error) => {
// 			toast.error(error.message);
// 		},
// 	});
// };
