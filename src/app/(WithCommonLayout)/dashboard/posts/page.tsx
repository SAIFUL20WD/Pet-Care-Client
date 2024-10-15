import { getPostsByUser } from "@/services/post";
import PostsUser from "./_component/PostsUser";

const Posts = async () => {
	const { data: posts } = await getPostsByUser();

	return (
		<div>
			<PostsUser allPost={posts} />
		</div>
	);
};

export default Posts;
