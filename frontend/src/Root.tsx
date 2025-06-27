import './App.css'
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLng } from "leaflet";
import 'leaflet/dist/leaflet.css';
import BottomSheet from './BottomSheet';
import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useGps } from './GpsContext';
import PointMarker from './PointMarker';
import { useEffect, useState } from 'react';
import RecentMap from './RecentMap';
import ZoomWatcher from './ZoomWatcher';
import { GetPointsApiResponseReturnFive, GetPostsApiResponseReturnFive } from './mock';
import ErrorDialog from './ErrorDialog';
import type { Point } from './types/Point';
import type { Post } from './types/Post';
import type { PointManage } from './types/PostManage';
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

function Root() {
    const navigate = useNavigate();
    const [points, setPoints] = useState<PointManage[]>([]);
    const [posts, setPosts] = useState<Post[]>([])
    const { lat, lng } = useGps();
    const [centerPosition, setCenterPosition] = useState<LatLng>(new LatLng(0, 0));
    const [userPosition, setUserPosition] = useState<LatLng>(new LatLng(lat, lng));
    const [zoom, setZoom] = useState<number>(13);
    const [isOpenErrorDialog, setIsOpenErrorDialog] = useState(false)
    const [errorTitle, setErrorTitle] = useState<string>("");
    const [errorDetail, setErrorDetail] = useState<string[]>([]);
    const [isSortByTime, setIsSortByTime] = useState<boolean>(false);
    const [focusPointId, setFocusPointId] = useState<string>("");
    
    useEffect(() => {
        setUserPosition(new LatLng(lat, lng));
    }, [lat, lng]);

    // TODO デプロイ時にはコメントアウト
    useEffect(() => {
        setPosts(GetPostsApiResponseReturnFive());
        setPoints(GetPointsApiResponseReturnFive());
    }, []);

    useEffect(() => {
        getViewRangePointList();
    }, [centerPosition, zoom]);

    useEffect(() => {
        getPosts(focusPointId);
    }, [isSortByTime, focusPointId])
    

    const handleGoToPost = () => {
        navigate('/post');
    };

    const getPosts = async(pointId: string)=> {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setIsOpenErrorDialog(true);
            setErrorTitle('認証エラーが発生しました。');
            setErrorDetail([`ユーザーIDが不正な疑いがあります。`, `ページを更新してください。`]);
            return;
        }

        try {
            const response = await fetch(`${API_ORIGIN}/api/posts/${userId}/${pointId}?sortByTime=${isSortByTime}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            // ステータスコードで判定
            if (response.status === 200) {
                const data: Post[] = await response.json();
                setPosts(data);
            } else if (response.status === 401) {
                setIsOpenErrorDialog(true);
                setErrorTitle('認証エラーが発生しました。');
                setErrorDetail([`ユーザーIDが不正な疑いがあります。`, `ページを更新してください。`]);
            } else if (response.status === 404) {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([`時間を開けて再度お試しください。`, `エラーが解消しない場合にはサポートに連絡してください。`]);
            } else if (response.status === 500) {
                setIsOpenErrorDialog(true);
                setErrorTitle('サーバーエラーが発生しました。');
                setErrorDetail([`時間を開けて再度お試しください。`, `エラーが解消しない場合にはサポートに連絡してください。`]);
            } else {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([`時間を開けて再度お試しください。`, `エラーが解消しない場合にはサポートに連絡してください。`]);
            }
        } catch (error) {
            setIsOpenErrorDialog(true);
            setErrorTitle('想定外のエラーが発生しました。');
            setErrorDetail([`時間を開けて再度お試しください。`, `エラーが解消しない場合にはサポートに連絡してください。`]);
        }
    }

    const onClickPoint = (pointId: string, existInner: boolean)=> {
        // 範囲内でない場合
        if (!existInner) {
            setIsOpenErrorDialog(true);
            setErrorTitle('投稿ポイントが閲覧可能範囲外です。');
            setErrorDetail([`ぜひ現地へ行って確認してください！`]);
            return;
        }
        
        // 範囲内の場合
        setFocusPointId(pointId);
    }

    const getViewRangePointList = async ()=> {
        // TODO 完成時には消す
        return;
        try {
            const response = await fetch(`${API_ORIGIN}/api/points/${centerPosition.lat}/${centerPosition.lng}/${zoom}/${userPosition.lat}/${userPosition.lng}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            // ステータスコードで判定
            if (response.status === 200) {
                const data: PointManage = await response.json();
            } else if (response.status === 404) {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([`時間を開けて再度お試しください。`, `エラーが解消しない場合にはサポートに連絡してください。`]);
            } else if (response.status === 500) {
                setIsOpenErrorDialog(true);
                setErrorTitle('サーバーエラーが発生しました。');
                setErrorDetail([`時間を開けて再度お試しください。`, `エラーが解消しない場合にはサポートに連絡してください。`]);
            } else {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([`時間を開けて再度お試しください。`, `エラーが解消しない場合にはサポートに連絡してください。`]);
            }
        } catch (error) {
            setIsOpenErrorDialog(true);
            setErrorTitle('想定外のエラーが発生しました。');
            setErrorDetail([`時間を開けて再度お試しください。`, `エラーが解消しない場合にはサポートに連絡してください。`]);
            console.error('エラー:', error);
        }
    }
    
    return (
        <>
            <ErrorDialog isOpen={isOpenErrorDialog} setIsOpen={setIsOpenErrorDialog} errorTitle={errorTitle} errorDetail={errorDetail} />
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
                <BottomSheet posts={posts} setIsSortByTime={setIsSortByTime}
                    setPosts={setPosts}
                    getViewRangePointList={getViewRangePointList}
                    setIsOpenErrorDialog={setIsOpenErrorDialog}
                    setErrorTitle={setErrorTitle}
                    setErrorDetail={setErrorDetail}
                />
                <MapContainer center={userPosition} zoom={zoom} style={{ height: '100dvh', width: '100vw' }} className="z-0">
                    <ZoomWatcher setZoom={setZoom} setCenterPosition={setCenterPosition}/>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={[userPosition.lat, userPosition.lng]}
                    />
                    {points.map((pointManage) => (
                        <PointMarker key={pointManage.symbolPoint.pointId} pointManage={pointManage} onClickPoint={onClickPoint} />
                    ))}
                </MapContainer>
            </div>
        </>
    )
}

export default Root