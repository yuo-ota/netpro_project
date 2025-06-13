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

    useEffect(() => {
        if (!navigator.geolocation) {
        setLocation((prev) => ({ ...prev, error: '位置情報未対応のブラウザです。' }));
        return;
        }

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
    }, []);

    return <GpsContext.Provider value={location}>{children}</GpsContext.Provider>;
};

export const useGps = (): GpsData => {
    const context = useContext(GpsContext);
    if (!context) throw new Error('useGps must be used within a GpsProvider');
    return context;
};