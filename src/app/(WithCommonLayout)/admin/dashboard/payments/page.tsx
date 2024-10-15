import { getAllPayments } from "@/services/user";

const Followings = async () => {
	const { data: payments } = await getAllPayments();

	return (
		<div className="">
			{payments.map((payment: any) => {
				return (
					<div
						key={payment._id}
						className="text-center flex-col justify-center items-center p-10 shadow my-5"
					>
						<h5 className="text-2xl text-custom">
							{payment.userId.name}
						</h5>
						<p className="text-gray-500">{payment.transcationId}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Followings;
