"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const RedirectButton = () => {
	const router = useRouter();
	return (
		<Button
			className="bg-custom"
			size="lg"
			onClick={() => router.push("/profile/edit")}
		>
			Edit Profile
		</Button>
	);
};

export default RedirectButton;
