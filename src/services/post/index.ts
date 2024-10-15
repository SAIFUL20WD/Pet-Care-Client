"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FormikValues } from "formik";
import envConfig from "@/config/envConfig";

export const createPost = async (postData: FormikValues): Promise<any> => {
	try {
		const { data } = await axiosInstance.post("/posts", postData);
		revalidateTag("posts");
		return data;
	} catch (error) {
		throw new Error("Failed to create post");
	}
};

export const getPosts = async (
	offset: number,
	limit: number,
	category: string = "",
	title: string = "",
	vote: string = ""
) => {
	try {
		const { data } = await axiosInstance.get(
			`/posts?offset=${offset}&limit=${limit}&category=${category}&title=${title}&vote=${vote}`
		);
		return data.data;
	} catch (error: any) {
		if (error.response) {
			return [];
			// console.log(error.response.data.message);
		}
		// console.log(error);
		// throw new Error(`An error happened: ${error}`);
	}
};

export const getAllPost = async () => {
	const fetchOption = {
		next: {
			tags: ["posts"],
		},
	};

	const res = await fetch(`${envConfig.baseApi}/posts`, fetchOption);

	return res.json();
};

export const getPostById = async (postId: string) => {
	try {
		const { data } = await axiosInstance.get(`/posts/${postId}`);
		return data;
	} catch (error: any) {
		if (error.response) {
			return [];
			// console.log(error.response.data.message);
		}
		// throw new Error(error?.response?.data?.message);
	}

	// const res = await fetch(`${envConfig.baseApi}/posts/${postId}`, {
	// 	next: {
	// 		tags: ["postById"],
	// 	},
	// });

	// return res.json();
};

export const getPostsByUser = async () => {
	const res = await axiosInstance.get(`/posts/get-user-post`);
	return res.data;
};

export const updatePost = async (postData: FormikValues): Promise<any> => {
	try {
		const { data } = await axiosInstance.put(
			`/posts/${postData.id}`,
			postData
		);
		// revalidateTag("posts");
		return data;
	} catch (error: any) {
		// console.log(error.response.data.message);
		throw new Error("Failed to update post");
	}
};

// export const deletePost = async (postId: string): Promise<any> => {
// 	try {
// 		const { data } = await axiosInstance.delete(`/posts/${postId}`);
// 		// revalidateTag("posts");
// 		return data;
// 	} catch (error) {
// 		throw new Error("Failed to delete post");
// 	}
// };
