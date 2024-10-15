import { getAllUser } from "@/services/user";
import Image from "next/image";

const Followers = async () => {
	const { data: users } = await getAllUser();

	return (
		<div className="">
			{users.map((user: any) => {
				return (
					<div
						key={user._id}
						className="text-center flex-col justify-center items-center p-10 shadow my-5"
					>
						<div className="flex justify-center">
							<Image
								src={user.image}
								alt="user image"
								width={50}
								height={50}
								className="rounded-full"
							/>
						</div>
						<h5 className="text-2xl text-custom">{user.name}</h5>
						<p className="text-gray-500">{user.email}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Followers;
