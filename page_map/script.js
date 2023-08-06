// Inicializar el mapa en el div "map" y hacer zoom en las coordenadas de Sonva
const map = L.map('map').setView([-2.9127463739190893, -78.99484858021965], 19);

// Añadir capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Crear un marcador en las coordenadas iniciales (Sonva) y agregarlo al mapa
const initialMarker = L.marker([-2.9127463739190893, -78.99484858021965]).addTo(map);

// Asignar una etiqueta al marcador que se muestra al pasar el mouse o al hacer clic
initialMarker.bindPopup('Sonva');

// Función para mostrar el popup al hacer clic en el marcador
function openPopupOnClick(e) {
    initialMarker.openPopup();
}

// Asignar el evento clic para mostrar el popup
initialMarker.on('click', openPopupOnClick);

// Variable para almacenar el marcador del usuario
let userMarker = null;

// Función para actualizar la ubicación del marcador del usuario
function updateUserLocationMarker(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    // Si el marcador del usuario ya existe, actualiza su posición
    if (userMarker) {
        userMarker.setLatLng([userLat, userLng]);
    } else {
        // Crea un marcador en la ubicación actual del usuario y agrégalo al mapa
        userMarker = L.marker([userLat, userLng]).addTo(map);

        // Asigna una etiqueta al marcador que se muestra al pasar el mouse o al hacer clic
        userMarker.bindPopup('Mi Ubicación Actual');
    }
}

// Llama a la función de actualización de ubicación cuando se obtienen los datos de geolocalización
navigator.geolocation.watchPosition(updateUserLocationMarker);

// Agregar un botón para reubicar a la persona sobre el punto inicial Sonva
const recenterButton = L.control({ position: 'topright' });

recenterButton.onAdd = function (map) {
    const button = L.DomUtil.create('button', 'recenter-button');
    button.innerHTML = 'Reubicarme en Sonva';
    button.onclick = function () {
        map.setView([-2.9127463739190893, -78.99484858021965], 19);
    };
    return button;
};

recenterButton.addTo(map);

// Agregar un botón para volver a la ubicación actual del usuario
const recenterToUserButton = L.control({ position: 'topright' });

recenterToUserButton.onAdd = function (map) {
    const button = L.DomUtil.create('button', 'recenter-button');
    button.innerHTML = 'Volver a Mi Ubicación';
    button.onclick = function () {
        if (userMarker) {
            const userLatLng = userMarker.getLatLng();
            map.setView(userLatLng, map.getZoom());
        }
    };
    return button;
};

recenterToUserButton.addTo(map);

//Zona delimitada
var polygon = L.polygon([
    [-2.9123480829109094, -78.994802731196],
    [-2.9123688307683473, -78.99611673029776],
    [-2.9134762471044566, -78.9961556828403],
    [-2.9135047753797516, -78.99481831221301]
]).addTo(map);