"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminDashboardNav = () => {
	const pathname = usePathname();

	const options = [
		{ key: 1, label: "Posts" },
		{ key: 2, label: "Users" },
		{ key: 3, label: "Payments" },
	];
	return (
		<div className="col-span-3 max-h-[200px]">
			{options.map((option) => {
				return (
					<Link
						key={option.key}
						href={"/admin/dashboard/" + option.label.toLowerCase()}
						className={`flex justify-start p-3 items-center my-3 cursor-pointer ${
							pathname ===
							"/admin/dashboard/" + option.label.toLowerCase()
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

export default AdminDashboardNav;
