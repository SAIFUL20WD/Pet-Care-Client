import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/Auth";

const AuthRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const user = await getCurrentUser();

	if (!user) {
		if (AuthRoutes.includes(pathname)) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(
				new URL(`/login?redirect=${pathname}`, request.url)
			);
		}
	}

	if (pathname.includes("admin")) {
		if (user.role === "admin") {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (user?.role === "user") {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
	matcher: [
		"/dashbaord",
		"/profile",
		"/profile/:page*",
		"/create-post",
		"/admin",
		"/login",
		"/register",
	],
};
