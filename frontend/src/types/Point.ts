export type Point = {
    isUserInThisArea: boolean;
    pointId: string;
    latitude: number;
    longitude: number;
    postCount: number;
};

export const isPoint = (obj: unknown): obj is Point => {
    if (typeof obj !== 'object' || obj === null) return false;

    const point = obj as { [key: string]: unknown };

    return (
        typeof point.pointId === 'string' &&
        typeof point.latitude === 'number' &&
        typeof point.longitude === 'number' &&
        typeof point.isUserInThisArea === 'boolean' &&
        typeof point.postCount === 'number'
    );
};
