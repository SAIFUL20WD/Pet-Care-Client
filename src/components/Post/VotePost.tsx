"use client";

import envConfig from "@/config/envConfig";
import axios from "axios";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type TVotePostProps = {
	postId: string;
	voteData: {
		up: number;
		down: number;
	};
};

const VotePost = ({ postId, voteData }: TVotePostProps) => {
	const [vote, setVote] = useState(voteData);
	const handleVote = async (voteType: string) => {
		try {
			const { data } = await axios.patch(
				`${envConfig.baseApi}/posts/${postId}/vote`,
				{ vote: voteType }
			);
			if (voteType === "up") {
				setVote((prevVote) => ({ ...prevVote, up: prevVote.up + 1 }));
			} else {
				setVote((prevVote) => ({
					...prevVote,
					down: prevVote.down + 1,
				}));
			}
			toast.success(data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};
	return (
		<div className="flex gap-5 shadow p-5 my-5">
			<div className="flex gap-3 cursor-pointer">
				<ThumbsUp onClick={() => handleVote("up")} />
				<ThumbsDown onClick={() => handleVote("down")} />
			</div>

			<div className="flex gap-3">
				{vote ? (
					<>
						<span>Upvote: {vote.up}</span>
						<span>Downvote: {vote.down}</span>
					</>
				) : null}
			</div>
		</div>
	);
};

export default VotePost;
