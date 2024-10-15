"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import registerImg from "@/assets/images/signup.png";
import Image from "next/image";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useUserRegistration } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";

const Register = () => {
	const [isVisible, setIsVisible] = useState(false);
	const {
		mutate: handleUserRegister,
		isPending,
		isSuccess,
	} = useUserRegistration();

	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			phone: "",
			address: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Required"),
			password: Yup.string()
				.min(8, "Minimum 8 characters or more")
				.max(32, "Maximum 32 characters allowed")
				.required("Required"),
			phone: Yup.string()
				.min(1, "Minimum 1 characters or more")
				.max(15, "Maximum 15 characters allowed")
				.required("Required"),
			address: Yup.string()
				.max(200, "Maximum 200 characters allowed")
				.required("Required"),
		}),
		onSubmit: (values) => {
			handleUserRegister(values);
		},
	});

	useEffect(() => {
		if (!isPending && isSuccess) {
			router.push("/login");
		}
	}, [isPending, isSuccess, router]);

	return (
		<section className="max-w-5xl mx-auto my-16 py-10">
			<h5 className="text-center text-3xl text-custom capitalize mb-5">
				Register
			</h5>

			<div className="grid grid-cols-12 gap-10 shadow p-10">
				<div className="col-span-6 max-lg:col-span-12">
					<h3 className="text-2xl text-center text-custom font-semibold uppercase">
						Hello! Welcome
					</h3>
					<Image src={registerImg} alt="Sign Up Illustartion" />
				</div>

				<form
					className="col-span-6 self-center max-lg:col-span-12 flex max-w-md flex-col gap-4 mx-5"
					onSubmit={formik.handleSubmit}
				>
					<Input
						id="name"
						type="text"
						label="Name"
						variant="bordered"
						placeholder="Enter Your Name"
						isInvalid={
							formik.touched.name && formik.errors.name
								? true
								: false
						}
						errorMessage={formik.touched.name && formik.errors.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="max-w-md"
					/>

					<Input
						id="email"
						type="email"
						label="Email"
						variant="bordered"
						placeholder="Enter Your Email"
						isInvalid={
							formik.touched.email && formik.errors.email
								? true
								: false
						}
						errorMessage={
							formik.touched.email && formik.errors.email
						}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="max-w-md"
					/>

					<Input
						id="password"
						label="Password"
						variant="bordered"
						placeholder="Enter Your Password"
						endContent={
							<button
								className="focus:outline-none"
								type="button"
								onClick={() => setIsVisible(!isVisible)}
								aria-label="toggle password visibility"
							>
								{isVisible ? (
									<Eye className="text-2xl text-default-400 pointer-events-none" />
								) : (
									<EyeClosed className="text-2xl text-default-400 pointer-events-none" />
								)}
							</button>
						}
						type={isVisible ? "text" : "password"}
						isInvalid={
							formik.touched.password && formik.errors.password
								? true
								: false
						}
						errorMessage={
							formik.touched.password && formik.errors.password
						}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="max-w-md"
					/>

					<Input
						id="phone"
						type="text"
						label="Phone Number"
						variant="bordered"
						placeholder="Enter Your Phone Number"
						isInvalid={
							formik.touched.phone && formik.errors.phone
								? true
								: false
						}
						errorMessage={
							formik.touched.phone && formik.errors.phone
						}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="max-w-md"
					/>

					<Input
						id="address"
						type="text"
						label="Address"
						variant="bordered"
						placeholder="Enter Your Address"
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

					<Button type="submit" size="lg" className="bg-custom">
						Register
					</Button>

					<p>
						Already have an account?{" "}
						<Link
							href="/login"
							className="cursor-pointer underline"
						>
							Login
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Register;
