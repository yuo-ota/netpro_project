import React, { createContext, useContext, useEffect, useState } from 'react';

type GpsData = {
    lat: number;
    lng: number;
    error: string | null;
};

const GpsContext = createContext<GpsData | null>(null);

export const GpsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [location, setLocation] = useState<GpsData>({
        lat: 0,
        lng: 0,
        error: null,
    });

    // 最初に一回取得
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            setLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                error: null,
            });
        },
        (err) => {
            setLocation((prev) => ({ ...prev, error: err.message }));
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        }
    );

    // 本番環境
    // useEffect(() => {
    //     if (!navigator.geolocation) {
    //         setLocation((prev) => ({ ...prev, error: '位置情報未対応のブラウザです。' }));
    //         return;
    //     }

    //     const watchId = navigator.geolocation.watchPosition(
    //         (pos) => {
    //             console.log();
    //             setLocation({
    //                 lat: pos.coords.latitude,
    //                 lng: pos.coords.longitude,
    //                 error: null,
    //             });
    //         },
    //         (err) => {
    //             setLocation((prev) => ({ ...prev, error: err.message }));
    //         },
    //         {
    //             enableHighAccuracy: true,
    //             timeout: 10000,
    //             maximumAge: 0,
    //         }
    //     );

    //     // アンマウント時に追跡を停止
    //     return () => navigator.geolocation.clearWatch(watchId);
    // }, []);

    // テスト環境
    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation((prev) => ({ ...prev, error: '位置情報未対応のブラウザです。' }));
            return;
        }

        const intervalId = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        error: null,
                    });
                },
                (err) => {
                    setLocation((prev) => ({ ...prev, error: err.message }));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        }, 10000); // ← ここで10秒おきに取得（ms単位）

        return () => clearInterval(intervalId);
    }, []);

    return <GpsContext.Provider value={location}>{children}</GpsContext.Provider>;
};

export const useGps = (): GpsData => {
    const context = useContext(GpsContext);
    if (!context) throw new Error('useGps must be used within a GpsProvider');
    return context;
};