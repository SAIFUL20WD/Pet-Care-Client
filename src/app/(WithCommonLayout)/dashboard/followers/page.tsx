import NoData from "@/components/UI/NoData";
import FollowCard from "@/components/User/FollowCard";
import { getUserFollow } from "@/services/user";

const Followers = async () => {
	let user = null;
	try {
		const { data } = await getUserFollow();
		user = data;
	} catch (error) {}

	return (
		<div>
			{user && user?.follower?.length > 0 ? (
				user.follower.map((follow: any, i: number) => {
					return <FollowCard key={i} followData={follow} />;
				})
			) : (
				<NoData message="No Follower yet" />
			)}
		</div>
	);
};

export default Followers;
