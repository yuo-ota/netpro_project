import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BottomSheet from '@/feature/Root/components/BottomSheet';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useGps } from '@/components/GpsContext';
import PointMarker from '@/feature/Root/components/PointMarker';
import { useEffect, useState } from 'react';
import MapController from '@/feature/Root/components/MapController';
import { isPost, type Post } from '@/types/Post';
import { isPointManage, type PointManage } from '@/types/PointManage';
import { useAuth } from '@/components/AuthProvider';
import postIcon from './assets/add_icon.svg';
import flagIcon from './assets/flag_icon.svg';
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

type RootProps = {
    setIsOpenErrorDialog: (isOpenErrorDialog: boolean) => void;
    setErrorTitle: (errorTitle: string) => void;
    setErrorDetail: (errorDetail: string[]) => void;
};

export const Root: React.FC<RootProps> = ({
    setIsOpenErrorDialog,
    setErrorTitle,
    setErrorDetail,
}) => {
    const navigate = useNavigate();
    const [points, setPoints] = useState<PointManage[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const { lat, lng } = useGps();
    const [centerPosition, setCenterPosition] = useState<LatLng>(new LatLng(0, 0));
    const [userPosition, setUserPosition] = useState<LatLng>(new LatLng(lat, lng));
    const [zoom, setZoom] = useState<number>(13);
    const [isSortByTime, setIsSortByTime] = useState<boolean>(false);
    const [focusPointId, setFocusPointId] = useState<string | undefined>(undefined);
    const { userId } = useAuth();
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [viewPosition, setViewPosition] = useState<LatLng>(new LatLng(0, 0));

    useEffect(() => {
        if (!userId) {
            setIsOpenErrorDialog(true);
            setErrorTitle('認証エラーが発生しました。');
            setErrorDetail([`ユーザーIDが不正な疑いがあります。`, `ページを更新してください。`]);
            return;
        }
    }, [userId]);

    useEffect(() => {
        setUserPosition(new LatLng(lat, lng));
    }, [lat, lng]);

    useEffect(() => {
        getViewRangePointList();
    }, [centerPosition, zoom, userPosition]);

    useEffect(() => {
        if (focusPointId === undefined) {
            return;
        }
        getPosts(focusPointId);
    }, [isSortByTime, focusPointId]);

    const handleGoToPost = () => {
        navigate('/post');
    };

    const getPosts = async (pointId: string) => {
        if (!userId) {
            setIsOpenErrorDialog(true);
            setErrorTitle('認証エラーが発生しました。');
            setErrorDetail([`ユーザーIDが不正な疑いがあります。`, `ページを更新してください。`]);
            return;
        }

        try {
            const response = await fetch(
                `${API_ORIGIN}/api/posts/${userId}/${pointId}?sortByTime=${isSortByTime}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );

            // ステータスコードで判定
            if (response.status === 200) {
                const data = await response.json();

                data.forEach((elem: any) => {
                    if (!isPost(elem)) {
                        throw new Error();
                    }
                });
                const responsedPostObj = data as Post[];
                setPosts(responsedPostObj);
            } else if (response.status === 401) {
                setIsOpenErrorDialog(true);
                setErrorTitle('認証エラーが発生しました。');
                setErrorDetail([
                    `ユーザーIDが不正な疑いがあります。`,
                    `ページを更新してください。`,
                ]);
            } else if (response.status === 404) {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            } else if (response.status === 500) {
                setIsOpenErrorDialog(true);
                setErrorTitle('サーバーエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            } else {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            }
        } catch (error) {
            setIsOpenErrorDialog(true);
            setErrorTitle('想定外のエラーが発生しました。');
            setErrorDetail([
                `時間を開けて再度お試しください。`,
                `エラーが解消しない場合にはサポートに連絡してください。`,
            ]);
        }
    };

    const onClickPoint = (pointId: string, existInner: boolean) => {
        // 範囲内でない場合
        if (!existInner) {
            setIsOpenErrorDialog(true);
            setErrorTitle('投稿ポイントが閲覧可能範囲外です。');
            setErrorDetail([`ぜひ現地へ行って確認してください！`]);
            return;
        }

        // 範囲内の場合
        setIsOpened(true);
        setFocusPointId(pointId);
    };

    const getViewRangePointList = async () => {
        try {
            const response = await fetch(
                `${API_ORIGIN}/api/points/${centerPosition.lat}/${centerPosition.lng}/${zoom}/${userPosition.lat}/${userPosition.lng}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );

            // ステータスコードで判定
            if (response.status === 200) {
                const data = await response.json();
                data.forEach((elem: any) => {
                    if (!isPointManage(elem)) {
                        throw new Error();
                    }
                });
                const responsedPointManageObj = data as PointManage[];
                setPoints(responsedPointManageObj);
            } else if (response.status === 404) {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            } else if (response.status === 500) {
                setIsOpenErrorDialog(true);
                setErrorTitle('サーバーエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            } else {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            }
        } catch (error) {
            setIsOpenErrorDialog(true);
            setErrorTitle('想定外のエラーが発生しました。');
            setErrorDetail([
                `時間を開けて再度お試しください。`,
                `エラーが解消しない場合にはサポートに連絡してください。`,
            ]);
            console.error('エラー:', error);
        }
    };

    const jumpUserPosition = () => {
        setViewPosition(new LatLng(userPosition.lat, userPosition.lng));
    };

    return (
        <>
            <div className="relative flex justify-center">
                <Button
                    className="absolute w-[32px] h-[32px] border-[2px] border-black/40 min-w-0 p-[0px] top-[84px] left-[11px]
                    bg-white rounded-full z-40
                    flex justify-center items-center
                    transition duration-200 ease-in-out hover:scale-110"
                    onClick={() => jumpUserPosition()}
                >
                    <img src={flagIcon} className="w-[20px] h-[20px]" />
                </Button>
                <Button
                    className="absolute w-[70px] h-[70px] bottom-[40px] right-[10%]
                    bg-main rounded-full z-40 shadow-md shadow-main-shadow/50
                    transition duration-200 ease-in-out hover:scale-110"
                    onClick={handleGoToPost}
                >
                    <img src={postIcon} alt="投稿画面遷移アイコン" className="h-2/3 w-auto" />
                </Button>
                <BottomSheet
                    posts={posts}
                    setIsSortByTime={setIsSortByTime}
                    setPosts={setPosts}
                    getViewRangePointList={getViewRangePointList}
                    setIsOpenErrorDialog={setIsOpenErrorDialog}
                    setErrorTitle={setErrorTitle}
                    setErrorDetail={setErrorDetail}
                    isOpened={isOpened}
                    setIsOpened={setIsOpened}
                />
                <MapContainer
                    center={userPosition}
                    zoom={zoom}
                    maxZoom={19}
                    style={{ height: '100dvh', width: '100vw' }}
                    className="z-0"
                >
                    <MapController
                        setZoom={setZoom}
                        setCenterPosition={setCenterPosition}
                        viewPosition={viewPosition}
                    />
                    <TileLayer
                        maxZoom={19}
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[userPosition.lat, userPosition.lng]} />
                    {points.map((pointManage) => (
                        <PointMarker
                            key={pointManage.symbolPoint.pointId}
                            pointManage={pointManage}
                            onClickPoint={onClickPoint}
                        />
                    ))}
                </MapContainer>
            </div>
        </>
    );
};
