"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/AxiosInstance";
import { FormikValues } from "formik";

export const registerUser = async (userData: FormikValues) => {
	try {
		const { data } = await axiosInstance.post("/auth/register", userData);

		// if (data.success) {
		// 	cookies().set("accessToken", data?.data?.accessToken);
		// 	cookies().set("refreshToken", data?.data?.refreshToken);
		// }

		return data;
	} catch (error: any) {
		throw new Error(error?.response?.data?.message);
	}
};

export const loginUser = async (userData: FormikValues) => {
	try {
		const { data } = await axiosInstance.post("/auth/login", userData);

		if (data.success) {
			cookies().set("accessToken", data?.data?.accessToken);
			cookies().set("refreshToken", data?.data?.refreshToken);
		}

		return data;
	} catch (error: any) {
		throw new Error(error?.response?.data?.message);
	}
};

export const logout = () => {
	cookies().delete("accessToken");
	cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
	const accessToken = cookies().get("accessToken")?.value;

	let decodedToken = null;

	if (accessToken) {
		decodedToken = await jwtDecode(accessToken);

		return {
			_id: decodedToken._id,
			name: decodedToken.name,
			email: decodedToken.email,
			image: decodedToken.image,
			phone: decodedToken.phone,
			address: decodedToken.address,
			isPremiumUser: decodedToken.isPremiumUser,
			role: decodedToken.role,
		};
	}

	return decodedToken;
};

export const getNewAccessToken = async () => {
	try {
		const refreshToken = cookies().get("refreshToken")?.value;

		const res = await axiosInstance({
			url: "/auth/refresh-token",
			method: "POST",
			withCredentials: true,
			headers: {
				cookie: `refreshToken=${refreshToken}`,
			},
		});

		return res.data;
	} catch (error) {
		throw new Error("Failed to get new access token");
	}
};
