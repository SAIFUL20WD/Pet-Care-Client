"use client";

import envConfig from "@/config/envConfig";
import { Button } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";

const ChangePostStatus = ({ id, status }: { id: string; status: string }) => {
	const handlePostStatusChange = async () => {
		try {
			const { data } = await axios.patch(
				`${envConfig.baseApi}/posts/status/${id}`,
				{ status: status }
			);
			toast.success(data.message);
		} catch (error) {
			toast.error("Failed to unplublish post");
		}
	};

	return (
		<Button
			color={status === "published" ? "primary" : "warning"}
			onClick={handlePostStatusChange}
			className="uppercase"
		>
			{status === "published" ? "publish" : "unpublished"}
		</Button>
	);
};

export default ChangePostStatus;
