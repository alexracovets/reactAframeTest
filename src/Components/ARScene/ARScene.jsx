 
export default function AppScene() {
    return (
        <a-scene embedded arjs="trackingMethod: best; debugUIEnabled: false;">
            <a-camera gps-camera rotation-reader position="0 1 3"></a-camera>
            <a-entity id="arObject" geometry="primitive: box; depth: 1; height: 1; width: 1" material="color: red"
                gps-entity-place="latitude: 50.452481; longitude: 30.354043;" />
        </a-scene>
    );
}
