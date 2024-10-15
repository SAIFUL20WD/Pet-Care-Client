import { getPostById } from "@/services/post";
import Image from "next/image";
import parse from "html-react-parser";
import CommentPost from "@/components/Post/CommentPost";
import VotePost from "@/components/Post/VotePost";
import FollowUser from "@/components/Post/FollowUser";
import { getUserProfile } from "@/services/user";
import { format, parseISO } from "date-fns";
import { Dot } from "lucide-react";

interface IProps {
	params: {
		postId: string;
	};
}

const PostDetail = async ({ params: { postId } }: IProps) => {
	const { data: post } = await getPostById(postId);
	const { data: user } = await getUserProfile();

	const alreadyFollowing = user?.following.find(
		(item: string) => item === post.userId._id
	);

	let showContent = true;
	if (user === undefined && post.isPremium === "yes") {
		showContent = false;
	} else if (post.isPremium === "yes" && user?.isPremiumUser === "no") {
		showContent = false;
	}

	return (
		<div className="max-w-5xl mx-auto my-10">
			{!showContent ? (
				<p className="text-center text-xl">
					This post is only available for premium member. To see the
					blog please subscribe
				</p>
			) : null}
			{showContent && post ? (
				<div>
					<h1 className="text-4xl text-center font-bold">
						{post.title}
					</h1>
					<div className="flex justify-center items-center gap-3 my-5">
						<Image
							src={post.userId.image}
							alt="Author Image"
							width={50}
							height={50}
							className="rounded-full"
						/>
						<div className="text-start">
							<p className="font-semibold">
								{post.userId.name}
								{!user ? null : alreadyFollowing ? (
									<span> - Following</span>
								) : (
									<FollowUser followId={post.userId._id} />
								)}
							</p>
							<div className="flex items-center">
								<p className="text-gray-600">
									{format(
										parseISO(post.createdAt as string),
										"dd MMMM, yyyy"
									)}
								</p>
								<Dot size={15} />
								<p className="text-gray">5 Min Read</p>
							</div>
						</div>
					</div>
					<div className="mt-5 mb-8">
						<Image
							src={post.image}
							alt="Banner Image"
							width={1000}
							height={500}
							className="rounded-lg"
						/>
					</div>
					<div className="tiptap">{parse(post.content)}</div>

					<VotePost postId={post._id} voteData={post.vote} />

					<div className="border-t-2 my-3">
						<h5 className="text-2xl font-bold">All Comments</h5>
					</div>

					<CommentPost
						postId={post._id}
						commentsData={post.comment}
					/>
				</div>
			) : null}
		</div>
	);
};

export default PostDetail;
