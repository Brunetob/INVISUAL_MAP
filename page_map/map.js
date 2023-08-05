const corner1 = L.latLng(-2.9135047753797516, -78.99481831221301);
const corner2 = L.latLng(-2.9123480829109094, -78.9961556828403);
const bounds = L.latLngBounds(corner1, corner2);

const map = L.map('map', {
    center: bounds.getCenter(),
    zoom: 16,
    maxBounds: bounds
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const streets = [
    { name: "Calle Las Herrerías", coords: [
        [-2.9126375497091885, -78.9948807856854],
        [-2.9130243426726383, -78.99483197532125],
        [-2.9135047753797516, -78.99481831221301]
    ] },
    { name: "Del Arupo", coords: [
        [-2.912345388148171, -78.99583305308524],
        [-2.9126144324578473, -78.99541754974037],
        [-2.9126375497091885, -78.9948807856854]
    ] },
    { name: "De las Acacias", coords: [
        [-2.9127022138493843, -78.99615723700948],
        [-2.91252893109786, -78.9959985695273],
        [-2.912345388148171, -78.99583305308524]
    ] },
    { name: "De las Retamas", coords: [
        [-2.9135047753797516, -78.99481831221301],
        [-2.912898381398307, -78.99553109702684],
        [-2.9127022138493843, -78.99615723700948]
    ] }
];

streets.forEach(street => {
    const polyline = L.polyline(street.coords, { color: 'blue' }).addTo(map);
    L.marker(street.coords[0]).addTo(map).bindPopup(street.name);
});

function addObstacleMarker(lat, lng) {
    L.marker([lat, lng], { icon: L.divIcon({ className: 'obstacle-marker' }) }).addTo(map);
}

function detectUserLocation() {
    map.locate({ setView: true, maxZoom: 16 });

    function onLocationFound(e) {
        L.marker(e.latlng, { icon: L.divIcon({ className: 'user-location-marker' }) }).addTo(map);
    }

    map.on('locationfound', onLocationFound);
}

// Agregar marcadores de obstáculos en las coordenadas proporcionadas
addObstacleMarker(-2.912850, -78.995400);
// Agregar más obstáculos aquí...

// Llamada a la función para detectar la ubicación del usuario
detectUserLocation();
