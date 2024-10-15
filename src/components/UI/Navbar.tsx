"use client";

import { useState } from "react";
import {
	Navbar as NextUINavbar,
	NavbarBrand,
	NavbarMenuToggle,
	NavbarMenuItem,
	NavbarMenu,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { SquarePen } from "lucide-react";
import NavbarDropdown from "./NavbarDropdown";
import { useUser } from "@/context/user.provider";

const Navbar = () => {
	const { user } = useUser();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const menuItems = ["about", "contact", "subscription", "Calculator"];

	return (
		<NextUINavbar
			// isBordered
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			isBlurred={false}
			disableAnimation={true}
			shouldHideOnScroll={true}
			className="font-semibold"
		>
			<NavbarContent className="sm:hidden pr-3">
				<NavbarBrand>
					<Link href="/">
						<Image src={logo} alt="logo" height={100} width={100} />
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="end">
				<NavbarBrand>
					<Link href="/">
						<Image src={logo} alt="logo" height={100} width={100} />
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="end">
				{menuItems.map((item, index) => {
					return (
						<NavbarItem key={index}>
							<Link
								href={`/${
									item === "Calculator"
										? "nutrition-calculator"
										: item
								}`}
								className={`uppercase ${
									pathname === "/" + item ? "active" : ""
								}`}
							>
								{item}
							</Link>
						</NavbarItem>
					);
				})}
			</NavbarContent>

			<NavbarContent justify="end">
				{user?.email ? (
					<>
						<NavbarItem className="hidden lg:flex">
							<Link href="/create-post" className="flex">
								<SquarePen />
								<span>Write</span>
							</Link>
						</NavbarItem>
						<NavbarItem className="hidden lg:flex">
							<NavbarDropdown />
						</NavbarItem>
					</>
				) : (
					<NavbarItem className="hidden lg:flex">
						<Link
							href="/login"
							className="uppercase bg-[#ceaf67] text-white px-5 py-2 shadow-lg rounded-xl"
						>
							Login
						</Link>
					</NavbarItem>
				)}
			</NavbarContent>

			<NavbarContent className="sm:hidden" justify="end">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				/>
			</NavbarContent>

			<NavbarMenu className="fixed-top">
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							href={`/${
								item === "Calculator"
									? "nutrition-calculator"
									: item
							}`}
							className={`uppercase ${
								pathname === "/" + item ? "active" : ""
							}`}
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</NextUINavbar>
	);
};

export default Navbar;
