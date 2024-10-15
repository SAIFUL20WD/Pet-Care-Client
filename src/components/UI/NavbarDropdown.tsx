import { useUser } from "@/context/user.provider";
import { logout } from "@/services/Auth";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const NavbarDropdown = () => {
	const router = useRouter();
	const { user, setIsLoading: userLoading } = useUser();

	const handleLogout = () => {
		logout();
		userLoading(true);
		router.push("/");
	};

	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Avatar
					isBordered
					as="button"
					className="transition-transform"
					src={user?.image}
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="Profile Actions" variant="flat">
				<DropdownItem key="user">
					<p className="font-semibold">{user?.name}</p>
				</DropdownItem>
				<DropdownItem
					key="profile"
					onClick={() => router.push("/profile")}
				>
					Profile
				</DropdownItem>
				<DropdownItem
					key="dashboard"
					onClick={() => router.push("/dashboard/posts")}
				>
					Dashboard
				</DropdownItem>
				<DropdownItem
					key="create-post"
					onClick={() => router.push("/create-post")}
				>
					Create Post
				</DropdownItem>
				{user?.role === "admin" ? (
					<DropdownItem
						key="admin"
						onClick={() => router.push("/admin/dashboard/posts")}
					>
						Admin Panel
					</DropdownItem>
				) : (
					<DropdownItem key="blank">Settings</DropdownItem>
				)}
				<DropdownItem
					key="logout"
					color="danger"
					onClick={handleLogout}
				>
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default NavbarDropdown;
