export interface IUser {
	_id: string;
	name: string;
	email: string;
	image?: string;
	phone: string;
	address: string;
	bio?: string;
	following?: string[];
	follower?: string[];
	isPremiumUser: string;
	role: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
}

export interface IPost {
	_id: string;
	userId: Partial<IUser>;
	title: string;
	content: string;
	image: string;
	category: string;
	vote: IVote;
	comment: IComment;
	isPremium: string;
	status: string;
	tag?: string[];
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
}

export interface IComment {
	userId: string;
	detail: string;
	replay: string;
}

export interface IVote {
	up: number;
	down: number;
}
