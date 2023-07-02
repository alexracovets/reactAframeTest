import 'aframe';
import React, { useEffect, useState, useRef } from 'react';
import { Scene, Entity } from 'react-aframe-ar';

export default function AppScene() {
    const [arObjectAttributes, setArObjectAttributes] = useState({ latitude: 50.452505227936946, longitude: 30.354042820289482 });
    const arObjectRef = useRef(null);
    useEffect(() => {
        const watchPositionId = navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
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
            <Entity
                id="arObject"
                ref={arObjectRef}
                gps-entity-place={`longitude: ${arObjectAttributes.longitude}; latitude: ${arObjectAttributes.latitude};`}
            >
                <Entity geometry={{ primitive: 'box', width: 1 }} material="color: red" />
            </Entity>
            <Entity gps-camera rotation-reader />
        </Scene>
    );
}
