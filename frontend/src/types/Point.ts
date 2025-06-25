export type Point = {
    pointId: string;
    latitude: number;
    longitude: number;
    isUserInThisArea: boolean;
};

export const isPoint = (obj: unknown): obj is Point => {
    if (typeof obj !== 'object' || obj === null) return false;

    const point = obj as { [key: string]: unknown };

    return (
        typeof point.pointId === 'string' &&
        typeof point.latitude === 'number' &&
        typeof point.longitude === 'number' &&
        typeof point.isUserInThisArea === 'boolean'
    );
};