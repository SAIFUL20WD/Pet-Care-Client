import { ReactNode } from "react";
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="max-w-7xl mx-auto">
			<Navbar />
			<main className="min-h-screen">{children}</main>
			<Footer />
		</div>
	);
};

export default layout;
