import PostList from "@/components/Post/PostList";
import { getPosts } from "@/services/post";

const Home = async () => {
	const initialPosts = await getPosts(0, 10);
	return (
		<div className="max-w-5xl mx-auto my-10">
			<PostList initialPosts={initialPosts} />
		</div>
	);
};

export default Home;
