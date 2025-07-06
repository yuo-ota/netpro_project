import type { Point } from './Point';
import { isPoint } from './Point'; // isPoint関数をインポート

export type PointManage = {
    postCount: number;
    symbolPoint: Point;
};

export const isPointManage = (obj: unknown): obj is PointManage => {
    if (typeof obj !== 'object' || obj === null) return false;

    const pm = obj as { [key: string]: unknown };

    return typeof pm.postCount === 'number' && isPoint(pm.symbolPoint);
};
