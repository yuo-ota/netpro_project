import L from "leaflet";
import { useMemo } from "react";
import { Marker } from "react-leaflet";

type Point = {
    pointId: string;
    latitude: number;
    longitude: number;
    count: number;
};

const formatCount = (count: number) => {
    if (count >= 1_000_000) {
        return `${Math.floor(count / 1_000_000)}M`;
    } else if (count >= 1_000) {
        return `${Math.floor(count / 1_000)}k`;
    }
    return count.toString();
};

const customDivIcon = (count: number) =>
    L.divIcon({
        html: `
        <div style="position: relative">
            <img
                src="/src/assets/comment_icon.svg";
            />
            ${
                count > 0
                    ? `<span 
                        style="
                            position: absolute;
                            width: 33px;
                            height: 33px;
                            top: -10.5px;
                            right: -10.5px;
                            background: var(--color-main);
                            color: white;
                            border-radius: 100%;
                            font-family: sans-serif;
                            font-size: 10px;
                            font-weight: bold;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        "
                    >${formatCount(count)}</span>`
                    : ""
            }
        </div>
        `,
        className: '',
        iconSize: [61.563, 53.188],
        iconAnchor: [30.7815, 53.188]
    }
);

export const PointMarker = ({ point }: { point: Point }) => {
    const icon = useMemo(() => customDivIcon(point.count), [point.count]);

    return (
        <Marker
        position={[point.latitude, point.longitude]}
        icon={icon}
        eventHandlers={{
            click: () => alert(point.pointId),
        }}
        />
    );
};
