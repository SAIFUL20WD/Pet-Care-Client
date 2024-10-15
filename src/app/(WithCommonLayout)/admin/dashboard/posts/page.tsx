import ChangePostStatus from "@/components/Post/ChangePostStatus";
import { getAllPost } from "@/services/post";
import { IPost } from "@/types";
import { format, parseISO } from "date-fns";

const Posts = async () => {
	const { data: posts } = await getAllPost();

	return (
		<div>
			{posts.map((post: IPost) => {
				return (
					<div
						key={post._id}
						className="flex justify-between items-center p-5 shadow-lg"
					>
						<div>
							<h3 className="text-3xl font-bold">{post.title}</h3>
							<p>Author: {post.userId.name}</p>
							<p className="text-gray-600">
								Publisehd:{" "}
								{format(
									parseISO(post.createdAt as string),
									"dd MMMM yyyy"
								)}
							</p>
						</div>
						<div className="flex gap-3">
							{post.status === "published" ? (
								<ChangePostStatus
									id={post._id}
									status={"unpublished"}
								/>
							) : (
								<ChangePostStatus
									id={post._id}
									status={"published"}
								/>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Posts;
