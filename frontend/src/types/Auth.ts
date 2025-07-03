export type Auth = {
    userId: string;
    isAuthed: boolean;
};

export const isAuth = (obj: unknown): obj is Auth => {
    if (typeof obj !== 'object' || obj === null) return false;

    const auth = obj as { [key: string]: unknown };

    return (
        typeof auth.userId === 'string' &&
        typeof auth.isAuthed === 'boolean'
    );
};