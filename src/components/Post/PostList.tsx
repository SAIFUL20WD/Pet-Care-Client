"use client";

import { getPosts } from "@/services/post";
import { IPost } from "@/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";

type TPostListProp = {
	initialPosts: IPost[];
};

export default function PostList({ initialPosts }: TPostListProp) {
	const [offset, setOffset] = useState(10);
	const [category, setCategory] = useState("");
	const [title, setTitle] = useState("");
	const [vote, setVote] = useState("");
	const [posts, setPosts] = useState(initialPosts);
	const [loading, setLoading] = useState(true);
	const { ref, inView } = useInView();

	const loadMorePosts = async () => {
		const apiPosts = await getPosts(offset, 10, category, title, vote);
		if (apiPosts?.length > 0) {
			setPosts((posts) => [...posts, ...apiPosts]);
			setOffset((offset) => offset + 10);
		} else {
			setLoading(false);
		}
	};

	const loadPostByCategory = (ctg: string) => {
		setCategory(ctg);
		setTitle("");
		setVote("");
		setPosts([]);
		setOffset(0);
	};

	const loadPostByTitle = (title: string) => {
		setTitle(title);
		setCategory("");
		setVote("");
		setPosts([]);
		setOffset(0);
	};

	const loadPostByVote = (vote: string) => {
		setVote(vote);
		setTitle("");
		setCategory("");
		setPosts([]);
		setOffset(0);
	};

	useEffect(() => {
		if (inView) {
			loadMorePosts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView, category, title, vote]);

	return (
		<>
			<div className="flex justify-between">
				<div>
					<Input
						id="title"
						type="text"
						variant="bordered"
						placeholder="Search Blog"
						className="mt-5"
						endContent={
							<Search
								onClick={(e: any) =>
									loadPostByTitle(
										e.target.parentElement.firstChild.value
									)
								}
								className="cursor-pointer"
							/>
						}
					/>
				</div>

				<div className="flex gap-5 my-5">
					<p
						onClick={() => loadPostByCategory("")}
						className="bg-custom px-5 py-2 rounded-xl cursor-pointer"
					>
						All
					</p>
					<p
						onClick={() => loadPostByCategory("tip")}
						className="bg-custom px-5 py-2 rounded-xl cursor-pointer"
					>
						Tip
					</p>
					<p
						onClick={() => loadPostByCategory("story")}
						className="bg-custom px-5 py-2 rounded-xl cursor-pointer"
					>
						Story
					</p>
				</div>

				<div className="w-48 mr-5 mt-3">
					<Select
						id="sortBy"
						label="Sort By Vote"
						className=""
						onChange={(e) => loadPostByVote(e.target.value)}
					>
						<SelectItem key="up">Up Vote</SelectItem>
						<SelectItem key="down">Down Vote</SelectItem>
					</Select>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				{posts?.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
				<div ref={ref}>
					{loading ? "Loading..." : "No more blogs available"}
				</div>
				{/* <button onClick={loadMoreUsers}>Load more</button> */}
			</div>
		</>
	);
}
