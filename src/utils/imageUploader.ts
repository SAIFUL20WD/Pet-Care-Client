import envConfig from "@/config/envConfig";

const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${envConfig.imageHostingApiKey}`;

const imageUploader = async (e: any) => {
	try {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		const res = await fetch(imageHostingAPI, {
			method: "post",
			body: formData,
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return err;
	}
};

export default imageUploader;
