import './App.css'
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { LatLng, Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';
import BottomSheet from './BottomSheet';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useGps } from './GpsContext';
import { useEffect, useMemo, useState } from 'react';
import RecentMap from './RecentMap';
import { GetPointsApiResponseReturnFive } from './mock';

function Root() {
    const navigate = useNavigate();
    const [points, setPoints] = useState<{ pointId: string; latitude: number; longitude: number; }[]>([]);
    const { lat, lng } = useGps();
    const [position, setPosition] = useState<LatLng>(new LatLng(lat, lng));
    const pointIcon: Icon = useMemo(() => L.icon({
        iconUrl: "/src/assets/comment_icon.svg",
        iconSize: [61.563, 53.188],
        iconAnchor: [30.7815, 53.188]
    }), []);

    useEffect(() => {
        setPoints(GetPointsApiResponseReturnFive());
    }, []);
    

    const handleGoToPost = () => {
        navigate('/post');
    };

    useEffect(() => {
        setPosition(new LatLng(lat, lng));
    }, [lat, lng]);
    
    return (
        <>
            <div className='relative flex justify-center'>
                <Button className="absolute w-[70px] h-[70px] bottom-[40px] right-[10%]
                    bg-main rounded-full z-40 shadow-md shadow-main-shadow/50
                    transition duration-200 ease-in-out hover:scale-110"
                    onClick={handleGoToPost}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#FFFFFF" className='h-2/3 w-auto'>
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                    </svg>
                </Button>
                <BottomSheet />
                <MapContainer center={position} zoom={13} style={{ height: '100dvh', width: '100vw' }} className="z-0">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RecentMap lat={position.lat} lng={position.lng} />
                    {points.map((i) => (
                        <Marker
                            position={new LatLng(i.latitude, i.longitude)}
                            icon={pointIcon}
                            key={i.pointId}
                            eventHandlers={{
                              click: () => alert(i.pointId)
                            }} />
                    ))}
                </MapContainer>
            </div>
        </>
    )
}

export default Root