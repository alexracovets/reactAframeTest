import 'aframe'; 
import { Scene, Entity, Box } from 'react-aframe-ar';

export default function AppScene() {
 
    return (
        <Scene
            vr-mode-ui="enabled: false"
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;"
        >
            <Box
                id="arObject" 
                material="color: red"
                gps-entity-place={`longitude: 30.354042820289482; latitude: 50.452505227936946;`}
            />

            <Entity gps-camera rotation-reader />
        </Scene>
    );
}
