// "use client";

// import * as React from "react";
// import { NextUIProvider } from "@nextui-org/system";
// import { useRouter } from "next/navigation";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { ThemeProviderProps } from "next-themes/dist/types";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "sonner";

// import UserProvider from "@/src/context/user.provider";

// export interface ProvidersProps {
//   children: React.ReactNode;
//   themeProps?: ThemeProviderProps;
// }

// export function Providers({ children, themeProps }: ProvidersProps) {
//   const router = useRouter();

//   return (
//     <QueryClientProvider client={queryClient}>
//       <UserProvider>
//         <NextUIProvider navigate={router.push}>
//           <Toaster />
//           <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
//         </NextUIProvider>
//       </UserProvider>
//     </QueryClientProvider>
//   );
// }

"use client";

import UserProvider from "@/context/user.provider";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<NextUIProvider>
					<Toaster />
					{children}
				</NextUIProvider>
			</UserProvider>
		</QueryClientProvider>
	);
}
