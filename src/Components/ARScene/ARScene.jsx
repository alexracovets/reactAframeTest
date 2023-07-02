import 'aframe';
import React, { useEffect, useState, useRef } from 'react';
import { Scene, Entity } from 'react-aframe-ar';

export default function AppScene() {
    const [userLatitude, setUserLatitude] = useState(0);
    const [userLongitude, setUserLongitude] = useState(0);
    const [arObjectAttributes, setArObjectAttributes] = useState({ latitude: 0, longitude: 0 });
    const arObjectRef = useRef(null);

    useEffect(() => {
        const watchPositionId = navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserLatitude(latitude);
                setUserLongitude(longitude);

                setArObjectAttributes({ latitude, longitude });
            },
            error => {
                console.error('Error retrieving geolocation:', error);
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchPositionId);
        };
    }, []);

    return (
        <Scene>
            <Entity id="arObject" ref={arObjectRef} gps-entity-place={arObjectAttributes}>
                <Entity geometry={{ primitive: 'box', width: 1 }} position="0 1 -2" material="color: red" />
            </Entity>
            <Entity gps-camera rotation-reader />
        </Scene>
    );
}
