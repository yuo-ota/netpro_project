import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import type { LatLng } from "leaflet";

type MapControllerProp = {
    setZoom: (zoom: number) => void;
    setCenterPosition: (centerPosition: LatLng) => void;
    viewPosition: LatLng;
}

const MapController: React.FC< MapControllerProp > = ({ setZoom, setCenterPosition, viewPosition }) => {
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

    useEffect(() => {
        map.panTo(viewPosition);
    }, [viewPosition])

    return null;
};

export default MapController