import EditPost from "@/components/Post/EditPost";
import { getPostById } from "@/services/post";

interface IProps {
	params: {
		postId: string;
	};
}

const PostEdit = async ({ params: { postId } }: IProps) => {
	const { data: post } = await getPostById(postId);
	return <EditPost post={post} />;
};

export default PostEdit;
