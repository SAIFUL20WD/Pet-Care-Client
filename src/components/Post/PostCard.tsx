import { IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Dot, Lock } from "lucide-react";

type TPostCardProps = {
	post: IPost;
};

const PostCard = ({ post }: TPostCardProps) => {
	return (
		<div className="flex items-center gap-10 shadow rounded my-3">
			<div>
				<Image
					src={post.image}
					alt="Post Image"
					width={400}
					height={300}
					className="max-h-[300px] rounded-md"
				/>
			</div>
			<div>
				{post.isPremium === "yes" ? (
					<p className="text-sm text-gray-600 flex items-center">
						<Lock size={15} />
						<span className="mx-1">Premium Only</span>
					</p>
				) : (
					""
				)}

				<p className="text-custom uppercase font-bold my-3">
					{post.category}
				</p>
				<Link
					href={`/post/${post._id}`}
					className="hover:underline hover:text-[#ceaf67] mb-5"
				>
					<h3 className="font-bold text-3xl">{post.title}</h3>
				</Link>

				<div className="flex items-center text-gray-700 my-3">
					<Image
						className="rounded-full mr-3"
						src={post.userId?.image as string}
						alt="User Photo"
						width={25}
						height={25}
					/>

					<p className="leading-none">{post?.userId.name}</p>
					<Dot size={25} />
					<p className="text-gray-600">
						{format(
							parseISO(post.createdAt as string),
							"dd MMMM, yyyy"
						)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
