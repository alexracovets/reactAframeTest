import 'aframe';
import React, { useEffect, useState, useRef } from 'react';
import { Scene, Entity, Box } from 'react-aframe-ar';

export default function AppScene() {
    const [arObjectAttributes, setArObjectAttributes] = useState({ longitude: 30.354042820289482, latitude: 50.452505227936946 });
    const arObjectRef = useRef(null);
    useEffect(() => {
        const watchPositionId = navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setArObjectAttributes({ longitude, latitude });
                console.log('Geolocation:', position.coords);
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
                ref={arObjectRef}
                material="color: red"
                gps-entity-place={`longitude: ${arObjectAttributes.longitude - 0.0005}; latitude: ${arObjectAttributes.latitude + 0.0006};`}
            />

            <Entity gps-camera rotation-reader />
        </Scene>
    );
}
