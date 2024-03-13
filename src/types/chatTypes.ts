export type MessageType = {
	id: string;
	text: string;
	user: UserType;
};

export type UserType = {
	id: number;
	username: string;
	avatarUrl: string;
};

export type CommentType = {
	id: number;
	body: string;
	postId: number;
	user: UserType;
};
