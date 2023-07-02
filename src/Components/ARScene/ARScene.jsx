import 'aframe';
import React, { useEffect, useState } from 'react';
import { Scene, Entity } from 'react-aframe-ar';

export default function AppScene() { // eslint-disable-line react/prefer-stateless-function
    const [userLatitude, setUserLatitude] = useState(0);
    const [userLongitude, setUserLongitude] = useState(0);

    useEffect(() => {
        const watchPositionId = navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserLatitude(latitude);
                setUserLongitude(longitude);
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
            <Entity gps-entity-place={`latitude: 50.452505227936946; longitude: 30.354042820289482;`}>
                <Entity geometry={{ primitive: 'box', width: 1 }} position="0 1 -2" material="color: red" />
            </Entity>
            <Entity gps-camera rotation-reader />
            <Entity position="0 2 -2" text={`value: ${userLatitude}, ${userLongitude}; align: center`} />
        </Scene>
    );
}
