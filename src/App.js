import { useEffect } from "react";

function App() {
    useEffect(() => {
        if (navigator.geolocation) {
            const arObject = document.getElementById("arObject");

            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                if (arObject) {
                    arObject.setAttribute("gps-entity-place", `latitude: ${latitude}; longitude: ${longitude};`);
                }
            });

        } else {
            console.log('Геолокація не підтримується вашим браузером');
        }
    });


    return (
        <a-scene embedded arjs="trackingMethod: best; debugUIEnabled: false;">
            <a-camera gps-camera rotation-reader></a-camera>
            <a-entity id="arObject" geometry="primitive: box; depth: 1; height: 1; width: 1" material="color: red"
                gps-entity-place="latitude: 50.452505227936946; longitude: 30.354042820289482;" />
        </a-scene>
    );
}

export default App;
