"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNav = () => {
	const pathname = usePathname();

	const options = [
		{ key: 1, label: "Posts" },
		{ key: 2, label: "Followers" },
		{ key: 3, label: "Followings" },
	];
	return (
		<div className="col-span-3 max-h-[200px]">
			{options.map((option) => {
				return (
					<Link
						key={option.key}
						href={"/dashboard/" + option.label.toLowerCase()}
						className={`flex justify-start p-3 items-center my-3 cursor-pointer ${
							pathname ===
							"/dashboard/" + option.label.toLowerCase()
								? "bg-slate-100"
								: "shadow"
						}`}
					>
						<span>{option.label}</span>
					</Link>
				);
			})}
		</div>
	);
};

export default DashboardNav;
