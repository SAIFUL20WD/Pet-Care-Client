"use client";

import RichTextEditor from "@/components/RichTextEditor";

import { useUpdatePost } from "@/hooks/post.hook";
import { IPost } from "@/types";
import imageUploader from "@/utils/imageUploader";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const EditPost = ({ post }: { post: IPost }) => {
	const router = useRouter();
	const { mutate: handleUpdatePost, isPending, isSuccess } = useUpdatePost();

	const formik = useFormik({
		initialValues: {
			image: post.image,
			title: post.title,
			content: post.content,
			category: post.category,
			isPremium: post.isPremium,
		},
		validationSchema: Yup.object({
			image: Yup.string().required("Required"),
			title: Yup.string().required("Required"),
			content: Yup.string().required("Required"),
			category: Yup.string().required("Required"),
			isPremium: Yup.string().required("Required"),
		}),
		onSubmit: (values) => {
			const postData = {
				...values,
				userId: post?.userId._id,
				id: post._id,
			};
			handleUpdatePost(postData);
		},
	});

	useEffect(() => {
		if (!isPending && isSuccess) {
			router.push("/");
		}
	}, [isPending, isSuccess, router]);

	const handleImageUpload = async (e: any) => {
		const toastId = toast.loading("Uploading");
		try {
			const res = await imageUploader(e);
			if (res.success) {
				formik.setFieldValue("image", res.data.url);
				toast.success("Image uploaded!", {
					id: toastId,
					duration: 2000,
				});
			} else {
				toast.error("Image upload failed!", {
					id: toastId,
					duration: 2000,
				});
			}
		} catch (err) {
			toast.error("Something went wrong!", {
				id: toastId,
				duration: 2000,
			});
		}
	};

	const handleBlogDetailChange = (blogDetails: string) => {
		formik.setFieldValue("content", blogDetails);
	};

	return (
		<div>
			<h1 className="text-4xl text-center text-custom my-5">
				Edit This Blog
			</h1>
			<form onSubmit={formik.handleSubmit}>
				<Input
					isRequired
					id="title"
					type="text"
					label="Title"
					variant="bordered"
					defaultValue={post.title}
					isInvalid={
						formik.touched.title && formik.errors.title
							? true
							: false
					}
					errorMessage={formik.touched.title && formik.errors.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="w-full my-5"
				/>
				<div className="flex items-center justify-center w-full my-5">
					<Image
						src={post.image}
						alt="Post Banner"
						width={200}
						height={200}
						className="p-3"
					/>
					<label
						htmlFor="dropzone-file"
						className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
					>
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Upload className="text-4xl text-gray-300" />
							<p className="py-1 text-sm text-gray-600 dark:text-gray-500">
								<span className="font-semibold capitalize">
									Click to upload new blog banner image
								</span>
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								PNG, JPG, WEBP up to 10MB
							</p>
							{formik.errors.image ? (
								<span className="text-red-500">
									{formik.errors.image}
								</span>
							) : null}
						</div>

						<input
							id="dropzone-file"
							type="file"
							className="hidden"
							accept=".png, .jpg, .jpeg, .webp"
							onChange={handleImageUpload}
						/>
					</label>
				</div>

				<div>
					<RichTextEditor
						content={post.content}
						onChange={handleBlogDetailChange}
					/>
				</div>

				<div className="flex justify-center my-5 gap-5">
					<Select
						id="category"
						isRequired
						label="Select a category"
						className="max-w-xs"
						defaultSelectedKeys={[post.category]}
						onChange={(e) =>
							formik.setFieldValue("category", e.target.value)
						}
						isInvalid={formik.errors.category ? true : false}
						errorMessage={formik.errors.category}
					>
						<SelectItem key="tip">Tip</SelectItem>
						<SelectItem key="story">Story</SelectItem>
					</Select>
					<Select
						id="premium"
						isRequired
						label="Do you want to make this blog premium?"
						className="max-w-xs"
						defaultSelectedKeys={[post.isPremium]}
						onChange={(e) =>
							formik.setFieldValue("isPremium", e.target.value)
						}
						isInvalid={formik.errors.isPremium ? true : false}
						errorMessage={formik.errors.isPremium}
					>
						<SelectItem key="yes">Yes</SelectItem>
						<SelectItem key="no">No</SelectItem>
					</Select>
				</div>

				<div className="flex justify-center">
					<Button type="submit" className="w-96 bg-custom mb-8">
						Update Blog
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EditPost;
