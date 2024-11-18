import { User } from './user';

export interface Comment {
    comment: string,
    edited: boolean,
    createdAt: Date,
    updatedAt: Date,
    commentId: string,
    postId: string,
    owner : User
}
