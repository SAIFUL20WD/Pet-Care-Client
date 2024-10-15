"use client";

import { useState } from "react";
import NoData from "@/components/UI/NoData";
import { IPost } from "@/types";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import envConfig from "@/config/envConfig";
import {
	Button,
	Modal,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";

const PostsUser = ({ allPost }: { allPost: IPost[] }) => {
	const [posts, setPosts] = useState(allPost);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

	const handleDeletePost = async (id: string) => {
		try {
			const { data } = await axios.delete(
				`${envConfig.baseApi}/posts/${id}`
			);
			const newPosts = posts.filter((post) => post._id !== id);
			setPosts(newPosts);
			toast.success(data.message);
		} catch (error) {
			toast.error("Failed to delete post");
		}
	};

	const confirmDelete = (id: string) => {
		setPostIdToDelete(id);
		onOpen();
	};

	return (
		<>
			{posts.length > 0 ? (
				posts.map((post: IPost) => (
					<div
						key={post._id}
						className="flex justify-between items-center p-5 shadow-lg"
					>
						<div>
							<h3 className="text-3xl font-bold">{post.title}</h3>
							<p className="text-gray-600">
								Published:{" "}
								{format(
									parseISO(post.createdAt as string),
									"dd MMMM yyyy"
								)}
							</p>
						</div>
						<div className="flex gap-3">
							<Link
								href={`/edit-post/${post._id}`}
								className="bg-custom px-5 py-2 rounded-xl"
							>
								Edit
							</Link>
							<Button
								color="danger"
								onPress={() => confirmDelete(post._id)}
							>
								Delete
							</Button>
						</div>
					</div>
				))
			) : (
				<NoData message="No post published yet" />
			)}
			<Modal isOpen={isOpen} onOpenChange={onClose}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="text-center my-3">
								Are you sure you want to delete this blog?
							</ModalHeader>
							<ModalFooter>
								<Button color="primary" onPress={onClose}>
									No
								</Button>
								<Button
									color="danger"
									onPress={() => {
										if (postIdToDelete) {
											handleDeletePost(postIdToDelete);
										}
										onClose();
									}}
								>
									Yes
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default PostsUser;
