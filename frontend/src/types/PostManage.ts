import type { Point } from "./Point";
import { isPoint } from "./Point"; // isPoint関数をインポート

export type PointManage = {
    pointCount: number;
    goodCount: number;
    symbolPoint: Point
};


export const isPostManage = (obj: unknown): obj is PointManage => {
    if (typeof obj !== 'object' || obj === null) return false;

    const pm = obj as { [key: string]: unknown };

    return (
        typeof pm.pointCount === 'number' &&
        typeof pm.goodCount === 'number' &&
        isPoint(pm.symbolPoint)
    );
};