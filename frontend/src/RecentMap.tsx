import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

function RecentMap({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng, map]);
    return null;
}

export default RecentMap