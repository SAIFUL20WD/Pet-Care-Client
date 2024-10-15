"use client";

import envConfig from "@/config/envConfig";
import { useUser } from "@/context/user.provider";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const FollowUser = ({ followId }: { followId: string }) => {
	const { user } = useUser();
	const handleFollow = async () => {
		try {
			const { data } = await axios.patch(
				`${envConfig.baseApi}/users/${user?._id}/follow`,
				{ followId }
			);
			toast.success(data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};
	return (
		<>
			<span> - </span>
			<span
				className="bg-custom p-1 rounded cursor-pointer"
				onClick={handleFollow}
			>
				Follow
			</span>
		</>
	);
};

export default FollowUser;
