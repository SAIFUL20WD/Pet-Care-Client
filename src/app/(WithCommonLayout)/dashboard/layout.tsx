import DashboardNav from "@/components/UI/DashboardNav";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<h3 className="text-center text-custom text-3xl my-5">Dashboard</h3>
			<div className="grid grid-cols-12 gap-5 max-w-5xl mx-auto">
				<DashboardNav />
				<div className="col-span-9">{children}</div>
			</div>
		</div>
	);
};

export default layout;
