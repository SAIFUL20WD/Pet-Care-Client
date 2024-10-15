import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";
import { FormikValues } from "formik";

export const getUserProfile = async () => {
	try {
		const { data } = await axiosInstance.get("/users/me");
		return data;
	} catch (error) {
		return [];
		// throw new Error("Failed to get user profile");
	}
};

export const updateUserProfile = async (
	postData: FormikValues
): Promise<any> => {
	try {
		const { data } = await axiosInstance.post("/users/me", postData);
		return data;
	} catch (error) {
		throw new Error("Failed to update profile");
	}
};

export const getUserFollow = async () => {
	try {
		const { data } = await axiosInstance.get("/users/me/follow");
		return data;
	} catch (error) {
		throw new Error("Failed to get user follow");
	}
};

export const getSubscription = async () => {
	try {
		const { data } = await axiosInstance.get("/payments/subscribe");
		return data;
	} catch (error) {
		throw new Error("Failed to subscribe");
	}
};

export const getAllUser = async () => {
	const { data } = await axiosInstance.get("/users");
	return data;
};

export const getAllPayments = async () => {
	const { data } = await axiosInstance.get("/payments");
	return data;
};
