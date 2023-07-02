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
                gps-entity-place="longitude: 30.354042820289482; latitude: 50.452505227936946;"
            />

            <Entity gps-camera rotation-reader />
        </Scene>
    );
}
