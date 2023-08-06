// Inicializar el mapa en el div "map" y hacer zoom en las coordenadas dadas
const map = L.map('map').setView([-2.9127463739190893, -78.99484858021965], 19);

// Añadir capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Crear un marcador en las coordenadas iniciales y agregarlo al mapa
const initialMarker = L.marker([-2.9127463739190893, -78.99484858021965]).addTo(map);

// Asignar una etiqueta al marcador que se muestra al pasar el mouse o al hacer clic
initialMarker.bindPopup('Sonva');

// Función para mostrar el popup al hacer clic en el marcador
function openPopupOnClick(e) {
    initialMarker.openPopup();
}

// Asignar el evento clic para mostrar el popup
initialMarker.on('click', openPopupOnClick);

// Agregar un botón para reubicar a la persona sobre el punto inicial Sonva
const recenterButton = L.control({ position: 'topright' });

recenterButton.onAdd = function (map) {
    const button = L.DomUtil.create('button', 'recenter-button');
    button.innerHTML = 'Reubicar en Sonva';
    button.onclick = function () {
        map.setView([-2.9127463739190893, -78.99484858021965], 18);
    };
    return button;
};

recenterButton.addTo(map);

// Función para agregar un marcador personalizado en una ubicación
function addCustomMarker(lat, lng, imageUrl, imageAlt) {
    // Crea un icono personalizado para el marcador
    const customIcon = L.icon({
        iconUrl: imageUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    // Crea el marcador con el icono personalizado y agrégalo al mapa
    const customMarker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    // Asigna una etiqueta al marcador que se muestra al pasar el mouse o al hacer clic
    customMarker.bindPopup(imageAlt);
}

// Actualiza la ubicación del marcador según la ubicación del usuario
function updateLocationMarker(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    // Elimina el marcador anterior, si existe
    if (userMarker) {
        map.removeLayer(userMarker);
    }

    // Llama a la función para agregar un marcador personalizado en la ubicación actual
    addCustomMarker(userLat, userLng, '../img/sonva_pin.png', 'Mi Ubicación Actual');

    // Centra el mapa en la nueva ubicación
    map.setView([userLat, userLng], map.getZoom());
}

// Llama a la función de actualización de ubicación cuando se obtienen los datos de geolocalización
navigator.geolocation.watchPosition(updateLocationMarker);

// Inicializa una variable para almacenar el marcador del usuario
let userMarker = null;
