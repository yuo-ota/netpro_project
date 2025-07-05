export type Good = {
    postId: string;
    isGooded: boolean;
};

export const isGood = (obj: unknown): obj is Good => {
    if (typeof obj !== 'object' || obj === null) return false;

    const good = obj as { [key: string]: unknown };

    return typeof good.postId === 'string' && typeof good.isGooded === 'boolean';
};
