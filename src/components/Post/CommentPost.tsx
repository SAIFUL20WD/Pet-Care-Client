"use client";

import envConfig from "@/config/envConfig";
import { useUser } from "@/context/user.provider";
import { IUser } from "@/types";
import { Button, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type TCommentPostProps = {
	postId: string;
	commentsData: {
		userId: Partial<IUser>;
		detail: string;
		reply?: Partial<IUser>;
	}[];
};

const CommentPost = ({ postId, commentsData }: TCommentPostProps) => {
	const [comments, setComments] = useState(commentsData);
	const { user } = useUser();
	const formik = useFormik({
		initialValues: {
			detail: "",
		},
		validationSchema: Yup.object({
			detail: Yup.string().required("Required"),
		}),
		onSubmit: async (values) => {
			const commentData = { userId: user?._id, detail: values.detail };
			try {
				const { data } = await axios.patch(
					`${envConfig.baseApi}/posts/${postId}/comment`,
					commentData
				);
				setComments([
					...commentsData,
					{ userId: user as IUser, detail: values.detail },
				]);
				toast.success(data.message);
			} catch (error: any) {
				toast.error(error.response.data.message);
			}
		},
	});
	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<Textarea
					id="detail"
					placeholder="Comment here..."
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="w-full mt-5"
				/>
				{user ? (
					<Button type="submit" className="bg-custom my-3">
						Comment
					</Button>
				) : (
					<p className="my-5">Login to comment</p>
				)}
			</form>
			{comments?.map((item, i) => {
				return (
					<div key={i} className="border p-5 my-3">
						<p className="font-semibold">{item.userId.name}</p>
						<p>{item.detail}</p>
					</div>
				);
			})}
		</div>
	);
};

export default CommentPost;
