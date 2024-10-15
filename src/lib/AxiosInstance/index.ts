import axios from "axios";
import { cookies } from "next/headers";
import envConfig from "@/config/envConfig";
import { getNewAccessToken } from "@/services/Auth";

const axiosInstance = axios.create({
	baseURL: envConfig.baseApi,
});

axiosInstance.interceptors.request.use(
	function (config) {
		const cookieStore = cookies();
		const accessToken = cookieStore.get("accessToken")?.value;

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	function (response) {
		// console.log(response.data);
		return response;
	},
	async function (error) {
		const config = error.config;

		// if (error?.response?.status === 404) {
		// 	// console.log("data not found");
		// 	return axiosInstance(config);
		// }

		if (error?.response?.status === 401 && !config?.sent) {
			config.sent = true;
			const res = await getNewAccessToken();
			const accessToken = res.data.accessToken;

			config.headers["Authorization"] = `Bearer ${accessToken}`;
			cookies().set("accessToken", accessToken);

			return axiosInstance(config);
		} else {
			return Promise.reject(error);
		}
	}
);

export default axiosInstance;
