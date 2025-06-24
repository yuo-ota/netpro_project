import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import type { LatLng } from "leaflet";

type ZoomWatcherProp = {
    setZoom: (zoom: number) => void;
    setCenterPosition: (centerPosition: LatLng) => void;
}

const ZoomWatcher: React.FC< ZoomWatcherProp > = ({ setZoom, setCenterPosition }) => {
    const map = useMap();

    useEffect(() => {
        const updateStatus = () => {
            setZoom(map.getZoom());
            setCenterPosition(map.getCenter());
        };

        map.on('moveend', updateStatus);  // 拡大・移動後に反映
        return () => {
            map.off('moveend', updateStatus);
        };
    }, [map]);

    return null;
};

export default ZoomWatcher