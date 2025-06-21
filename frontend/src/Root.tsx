import './App.css'
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLng } from "leaflet";
import 'leaflet/dist/leaflet.css';
import BottomSheet from './BottomSheet';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useGps } from './GpsContext';
import PointMarker from './PointMarker';
import { useEffect, useState } from 'react';
import RecentMap from './RecentMap';
import ZoomWatcher from './ZoomWatcher';
import { GetPointsApiResponseReturnFive } from './mock';
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

function Root() {
    const navigate = useNavigate();
    const [points, setPoints] = useState<{ pointId: string; latitude: number; longitude: number; count: number; existInner: boolean}[]>([]);
    const { lat, lng } = useGps();
    const [centerPosition, setCenterPosition] = useState<LatLng>(new LatLng(0, 0));
    const [userPosition, setUserPosition] = useState<LatLng>(new LatLng(lat, lng));
    const [zoom, setZoom] = useState<number>(13);
    
    useEffect(() => {
        setUserPosition(new LatLng(lat, lng));
    }, [lat, lng]);

    useEffect(() => {
        setPoints(GetPointsApiResponseReturnFive());
    }, []);
    

    const handleGoToPost = () => {
        navigate('/post');
    };

    const onClickPoint = async (pointId: string)=> {
        try {
            const response = await fetch(`${API_ORIGIN}/api/posts/${pointId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            // ステータスコードで判定
            if (response.status === 200) {
                const data = await response.json();
                console.log('取得成功:', data);
            } else if (response.status === 500) {
                console.warn('クライアントエラー');
            } else {
                throw new Error(`想定外のステータスコード: ${response.status}`);
            }
        } catch (error) {
            console.error('エラー:', error);
        }
    }

    const getViewRangePointList = async ()=> {
        try {
            const response = await fetch(`${API_ORIGIN}/api/points/${centerPosition.lat}/${centerPosition.lng}/${zoom}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            // ステータスコードで判定
            if (response.status === 200) {
                const data = await response.json();
                console.log('取得成功:', data);
            } else if (response.status === 500) {
                console.warn('クライアントエラー');
            } else {
                throw new Error(`想定外のステータスコード: ${response.status}`);
            }
        } catch (error) {
            console.error('エラー:', error);
        }
    }
    
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
                <MapContainer center={userPosition} zoom={zoom} style={{ height: '100dvh', width: '100vw' }} className="z-0">
                    <ZoomWatcher setZoom={setZoom} setCenterPosition={setCenterPosition}/>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={[userPosition.lat, userPosition.lng]}
                    />
                    {points.map((point) => (
                        <PointMarker key={point.pointId} point={point} onClickPoint={onClickPoint} />
                    ))}
                </MapContainer>
            </div>
        </>
    )
}

export default Root