import { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import CustomDivIcon from './CustomDivIcon';
import type { PointManage } from '@/types/PointManage';

type PointMarkerProps = {
    pointManage: PointManage;
    onClickPoint: (pointId: string, existInner: boolean) => void;
};

const PointMarker: React.FC<PointMarkerProps> = ({ pointManage, onClickPoint }) => {
    const icon = useMemo(
        () => CustomDivIcon(pointManage.postCount, pointManage.symbolPoint.isUserInThisArea),
        [pointManage.postCount, pointManage.symbolPoint.isUserInThisArea]
    );

    return (
        <Marker
            position={[pointManage.symbolPoint.latitude, pointManage.symbolPoint.longitude]}
            icon={icon}
            eventHandlers={{
                click: () =>
                    onClickPoint(
                        pointManage.symbolPoint.pointId,
                        pointManage.symbolPoint.isUserInThisArea
                    ),
            }}
        />
    );
};

export default PointMarker;
