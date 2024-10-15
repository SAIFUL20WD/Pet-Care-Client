"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { Eye, EyeClosed } from "lucide-react";
import loginImg from "@/assets/images/login.png";
import Link from "next/link";
import { useUserLogin } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";

const Login = () => {
	// const searchParams = useSearchParams();
	// const redirect = searchParams.get("redirect");
	const router = useRouter();
	const { setIsLoading } = useUser();

	const [isVisible, setIsVisible] = useState(false);
	const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

	const formik = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid email address")
				.required("Required"),
			password: Yup.string()
				.min(8, "Minimum 8 characters or more")
				.max(32, "Maximum 32 characters allowed")
				.required("Required"),
		}),
		onSubmit: (values) => {
			handleUserLogin(values);
			setIsLoading(true);
		},
	});

	useEffect(() => {
		if (!isPending && isSuccess) {
			// if (redirect) {
			// 	router.push(redirect);
			// } else {
			// 	router.push("/");
			// }
			router.push("/");
		}
	}, [isPending, isSuccess, router]);

	return (
		<section className="max-w-5xl mx-auto my-5">
			<h5 className="text-center text-3xl text-custom capitalize mb-5">
				Login
			</h5>

			<div className="grid grid-cols-12 gap-10 shadow p-10">
				<div className="col-span-6 max-lg:col-span-12">
					<h3 className="text-2xl text-center text-custom font-semibold uppercase">
						Good to see you again!
					</h3>
					<Image src={loginImg} alt="Login Illustartion" />
				</div>
				<form
					className="col-span-6 self-center max-lg:col-span-12 flex max-w-md flex-col gap-4 mx-5"
					onSubmit={formik.handleSubmit}
				>
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
					<Button type="submit" className="bg-custom" size="lg">
						Login
					</Button>
					<p>
						Don&apos;t have an account?{" "}
						<Link
							href="/register"
							className="cursor-pointer underline"
						>
							Register Now
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Login;
