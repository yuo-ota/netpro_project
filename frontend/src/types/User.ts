export type User = {
    userId: string;
};

export const isUser = (obj: unknown): obj is User => {
    if (typeof obj !== 'object' || obj === null) return false;

    const user = obj as { [key: string]: unknown };

    return (
        typeof user.userId === 'string'
    );
}