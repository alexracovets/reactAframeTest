function App() {
    return (
        <a-scene embedded arjs="trackingMethod: best; debugUIEnabled: false;">
            <a-camera gps-camera rotation-reader></a-camera>
            <a-entity id="arObject" geometry="primitive: box; depth: 1; height: 1; width: 1" material="color: red"
                gps-entity-place="latitude: 50.452505227936946; longitude: 30.354042820289482;" />
        </a-scene>
    );
}

export default App;
