import 'aframe';
import React from 'react';
import { Scene, Entity } from 'react-aframe-ar';

export default class AppScene extends React.Component {
    render() {
        const latitude = 50.452505227936946;
        const longitude = 30.354042820289482;

        return (
            <Scene>
                <Entity gps-entity-place={`latitude: ${latitude}; longitude: ${longitude};`}>
                    <Entity
                        geometry={{ primitive: 'box', width: 1 }}
                        position="0 1 -5"
                        material="color: red"
                    />
                </Entity>
                <Entity gps-camera rotation-reader />
            </Scene>
        );
    }
}