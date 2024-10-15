import { getUserProfile } from "@/services/user";
import { Cake, MessageCircle, NotebookText } from "lucide-react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { getPostsByUser } from "@/services/post";
import { IPost } from "@/types";
import RedirectButton from "@/components/Profile/RedirectButton";
import Link from "next/link";

const Profile = async () => {
	const { data: user } = await getUserProfile();
	const { data: posts } = await getPostsByUser();

	return (
		<div className="relative">
			<div className="h-32 bg-custom z-0"></div>
			<div className="absolute z-20 top-5 left-[575px]">
				<Image
					src={user.image}
					alt="user image"
					width={100}
					height={100}
					className="rounded-full border-[10px] border-[#ceaf67]"
				/>
			</div>
			<div className="absolute z-20 top-20 left-[990px]">
				<RedirectButton />
			</div>
			<div className="w-[990px] absolute top-16 left-36 z-10 bg-slate-100 rounded">
				<div className="text-center mt-10 px-10 py-5">
					<h3 className="text-center text-3xl font-bold">
						{user.name}
					</h3>
					<p className="text-xl my-3">{user.bio}</p>
					<div className="text-gray-400 flex justify-center items-center gap-3 my-5">
						<span>
							<Cake />
						</span>
						<span>
							{format(
								parseISO(user.createdAt as string),
								"MMMM dd, yyyy"
							)}
						</span>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-5 w-[990px] mx-auto mt-48">
				<div className="col-span-4 max-h-[200px] bg-slate-100 rounded">
					<div className="flex justify-start gap-1 p-3 items-center">
						<span>
							<NotebookText />
						</span>
						<span>{posts.length}</span>
						<span>Post Published </span>
					</div>
					<div className="flex justify-start gap-1 p-3 items-center">
						<span>
							<MessageCircle />
						</span>
						<span>22 Written</span>
						<span>Comments</span>
					</div>
				</div>
				<div className="col-span-8">
					{posts.map((post: IPost) => {
						return (
							<div
								key={post._id}
								className="flex items-center gap-10 shadow rounded my-3"
							>
								<div>
									<Image
										src={post.image}
										alt="Post Image"
										width={100}
										height={100}
										className="rounded-md"
									/>
								</div>
								<div>
									<p className="text-custom uppercase font-bold my-3">
										{post.category}
									</p>
									<Link
										href={`/post/${post._id}`}
										className="hover:underline hover:text-[#ceaf67] mb-5"
									>
										<h3 className="font-bold text-3xl">
											{post.title}
										</h3>
									</Link>

									<div className="flex items-center text-gray-700 my-3">
										<p className="text-gray-600">
											{format(
												parseISO(
													post.createdAt as string
												),
												"dd MMMM, yyyy"
											)}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Profile;
