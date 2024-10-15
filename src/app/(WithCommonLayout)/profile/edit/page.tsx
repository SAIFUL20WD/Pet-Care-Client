import EditProfileForm from "@/components/Profile/EditProfileForm";
import { getUserProfile } from "@/services/user";

const EditProfile = async () => {
	let user = null;
	try {
		const { data } = await getUserProfile();
		user = data;
	} catch (error) {}

	return (
		<div className="max-w-2xl bg-slate-50 mx-auto my-10 p-10">
			{user ? <EditProfileForm userData={user} /> : null}
		</div>
	);
};

export default EditProfile;
