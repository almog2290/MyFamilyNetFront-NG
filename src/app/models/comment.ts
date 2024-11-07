import { User } from './user';

export interface Comment {
    comment: string,
    edited: boolean,
    createdAt: Date,
    updatedAt: Date,
    commentId: number,
    postId: number,
    owner : User
}
