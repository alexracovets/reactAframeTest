import 'aframe';
import React, { useEffect } from 'react';
import { Scene, Entity, Box } from 'react-aframe-ar';

export default function AppScene() {
    useEffect(() => {
        const watchPositionId = navigator.geolocation.watchPosition(
            position => {
                console.log(position.coords)
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
        <Scene
            vr-mode-ui="enabled: false"
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;"
        >
            <Box
                id="arObject"
                material="color: red"
                gps-entity-place="latitude: 50.452481; longitude: 30.354043;"
            />

            <Entity gps-camera rotation-reader />
        </Scene>
    );
}
