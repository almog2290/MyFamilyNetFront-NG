export interface Post {
    likes: number,
    comments: number,
    followers: number,
    description: string,
    edited: boolean,
    createdAt: Date,
    postId: string,
    pageId: string,
    ownerName: string,
    ownerId: string,
    isLikedByME : boolean,
    title: string,
    logo: string
}
