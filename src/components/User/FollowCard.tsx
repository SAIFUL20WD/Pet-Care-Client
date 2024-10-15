import Image from "next/image";

const FollowCard = ({ followData }: any) => {
	return (
		<div className="text-center flex-col justify-center items-center p-10 shadow my-5">
			<div className="flex justify-center">
				<Image
					src={followData?.image}
					alt="user image"
					width={50}
					height={50}
					className="rounded-full"
				/>
			</div>
			<h5 className="text-2xl text-custom">{followData?.name}</h5>
			<p className="text-gray-500">{followData?.email}</p>
		</div>
	);
};

export default FollowCard;
