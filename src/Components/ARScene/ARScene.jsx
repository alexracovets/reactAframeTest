import 'aframe';
import React, { useEffect, useState } from 'react';
import { Scene, Entity } from 'react-aframe-ar';

export default function AppScene() {
    const targetLatitude = 50.452505227936946;
    const targetLongitude = 30.354042820289482;
    const [userLatitude, setUserLatitude] = useState(0);
    const [userLongitude, setUserLongitude] = useState(0);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserLatitude(latitude);
                setUserLongitude(longitude);

                // Обчислення відстані між користувачем і цільовими координатами
                const distanceInMeters = calculateDistance(latitude, longitude, targetLatitude, targetLongitude);
                setDistance(distanceInMeters);
            },
            error => {
                console.error('Помилка отримання геопозиції:', error);
            }
        );
    }, []);

    // Функція для обчислення відстані між двома координатами
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Радіус Землі в кілометрах
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c * 1000; // Відстань у метрах
        return distance;
    };

    // Функція для конвертації градусів в радіани
    const deg2rad = deg => {
        return deg * (Math.PI / 180);
    };

    return (
        <Scene>
            <Entity gps-entity-place={`latitude: ${targetLatitude}; longitude: ${targetLongitude};`}>
                <Entity geometry={{ primitive: 'box', width: 1 }} position="0 1 -5" material="color: red" />
            </Entity>
            <Entity gps-camera look-controls />
            <Entity position="0 1 -5" text={`value: Відстань: ${distance.toFixed(2)} м; align: center`} />
        </Scene>
    );
}
