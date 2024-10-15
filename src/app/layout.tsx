import type { Metadata } from "next";
import { Providers } from "@/lib/Providers";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";

const roboto = Roboto({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Paw Blog",
	description: "Pet Tips and Story Blog",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="light">
			<body className={roboto.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
