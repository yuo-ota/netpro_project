export type Post = {
    postId: string;
    postedTime: string;
    content: string;
    goodCount: number;
    isGooded: boolean;
};

export const isPost = (obj: unknown): obj is Post => {
    if (typeof obj !== 'object' || obj === null) return false;

    const post = obj as { [key: string]: unknown };

    return (
        typeof post.postId === 'string' &&
        typeof post.postedTime === 'string' &&
        typeof post.content === 'string' &&
        typeof post.goodCount === 'number' &&
        typeof post.isGooded === 'boolean'
    );
};
