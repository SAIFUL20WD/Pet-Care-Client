"use client";

import envConfig from "@/config/envConfig";
import { useUser } from "@/context/user.provider";
import axios from "axios";
import toast from "react-hot-toast";

const Subscription = () => {
	const { user } = useUser();
	const handleSubcribe = async () => {
		try {
			const { data } = await axios.get(
				`${envConfig.baseApi}/payments/subscribe?userId=${user?._id}`
			);
			console.log(data);
			window.location.href = data.data.payment_url;
		} catch (err: any) {
			toast.error(err.response.data.message);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
			<h1 className="text-3xl font-bold mb-4">
				Subscribe to Pet Care Tips & Stories
			</h1>
			<p className="mb-6 text-center">
				Join our community of pet lovers! Stay updated with the latest
				tips, heartwarming stories, and expert advice for a happy,
				healthy pet.
			</p>
			<div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto text-center">
				<h2 className="text-2xl font-bold mb-4">Lifetime Plan</h2>
				<p className="text-lg mb-4">
					<span className="font-bold text-2xl">$100</span> / Lifetime
				</p>
				<p className="text-gray-600 mb-4">
					Enjoy exclusive content, tips, and stories delivered right
					to your inbox!
				</p>
				<button
					onClick={handleSubcribe}
					className="bg-custom text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Subscribe Now
				</button>
			</div>
		</div>
	);
};
export default Subscription;
