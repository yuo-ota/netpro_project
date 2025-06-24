import { useMemo } from "react";
import { Marker } from "react-leaflet";
import CustomDivIcon from "./CustomDivIcon";

type PointMarkerProps = {
    point: Point;
    onClickPoint: (pointId: string, existInner: boolean) => void;
}

type Point = {
    pointId: string;
    latitude: number;
    longitude: number;
    count: number;
    existInner: boolean;
};

const PointMarker: React.FC< PointMarkerProps > = ({ point, onClickPoint }) => {
    const icon = useMemo(() => CustomDivIcon(point.count, point.existInner), [point.count, point.existInner]);

    return (
        <Marker
        position={[point.latitude, point.longitude]}
        icon={icon}
        eventHandlers={{
            click: () => onClickPoint(point.pointId, point.existInner),
        }}
        />
    );
};

export default PointMarker
