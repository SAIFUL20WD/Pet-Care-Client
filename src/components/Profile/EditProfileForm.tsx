"use client";

import envConfig from "@/config/envConfig";
import { IUser } from "@/types";
import imageUploader from "@/utils/imageUploader";
import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type TEditProfileFormProps = {
	userData: IUser;
};

const EditProfileForm = ({ userData }: TEditProfileFormProps) => {
	const [user, setUser] = useState(userData);
	const [profileUpdated, setProfileUpdated] = useState(false);
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			name: user.name,
			email: user.email,
			phone: user.phone,
			address: user.address,
			image: user.image,
			bio: user.bio,
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Required"),
			phone: Yup.string()
				.min(1, "Minimum 1 characters or more")
				.max(15, "Maximum 15 characters allowed")
				.required("Required"),
			address: Yup.string()
				.max(200, "Maximum 200 characters allowed")
				.required("Required"),
			image: Yup.string().required("Required"),
			bio: Yup.string().required("Required"),
		}),
		onSubmit: async (values) => {
			try {
				const res = await axios.put(
					`${envConfig.baseApi}/users/me/${user._id}`,
					values
				);
				setUser({ ...user, ...values });
				setProfileUpdated(true);
				toast.success(res.data.message);
			} catch (error: any) {
				toast.error(error.response.data.message);
			}
		},
	});

	useEffect(() => {
		if (profileUpdated) {
			router.push("/profile");
		}
	}, [profileUpdated, router]);

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

	return (
		<div>
			<h4 className="text-3xl text-custom my-3 ml-5">User Information</h4>
			<form
				className="col-span-6 self-center max-lg:col-span-12 flex max-w-md flex-col gap-4 mx-5"
				onSubmit={formik.handleSubmit}
			>
				<Input
					id="name"
					type="text"
					label="Name"
					labelPlacement="outside"
					variant="bordered"
					defaultValue={user.name}
					isInvalid={
						formik.touched.name && formik.errors.name ? true : false
					}
					errorMessage={formik.touched.name && formik.errors.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="max-w-md"
				/>

				<Input
					isDisabled
					id="email"
					type="email"
					label="Email"
					variant="bordered"
					labelPlacement="outside"
					defaultValue={user.email}
					isInvalid={
						formik.touched.email && formik.errors.email
							? true
							: false
					}
					errorMessage={formik.touched.email && formik.errors.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="max-w-md"
				/>

				<Input
					id="phone"
					type="text"
					label="Phone Number"
					labelPlacement="outside"
					variant="bordered"
					defaultValue={user.phone}
					isInvalid={
						formik.touched.phone && formik.errors.phone
							? true
							: false
					}
					errorMessage={formik.touched.phone && formik.errors.phone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="max-w-md"
				/>

				<Input
					id="address"
					type="text"
					label="Address"
					variant="bordered"
					labelPlacement="outside"
					defaultValue={user.address}
					isInvalid={
						formik.touched.address && formik.errors.address
							? true
							: false
					}
					errorMessage={
						formik.touched.address && formik.errors.address
					}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="max-w-md"
				/>

				<div>
					<Image
						src={formik.values.image ?? ""}
						alt="user image"
						width={50}
						height={50}
						className="rounded-full"
					/>
					<label
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						htmlFor="image"
					>
						Profile Image
					</label>
					<input
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						id="image"
						type="file"
						accept=".png, .jpg, .jpeg, .webp"
						onChange={handleImageUpload}
					/>
				</div>
				<Textarea
					id="bio"
					label="Bio"
					labelPlacement="outside"
					defaultValue={user.bio ? user.bio : "Your short bio..."}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="max-w-md"
				/>

				<Button type="submit" size="lg" className="bg-custom">
					Update Profile
				</Button>
			</form>
		</div>
	);
};

export default EditProfileForm;
