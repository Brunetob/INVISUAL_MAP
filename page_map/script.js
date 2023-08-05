// Coordenadas para centrar el mapa en Sonva, Cuenca
const cuencaCoordinates = [-2.913133, -78.994834];

// Inicializar el mapa en el div "map"
const map = L.map('map').setView(cuencaCoordinates, 16);

// Añadir capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Agregar un marcador para Sonva
L.marker(cuencaCoordinates).addTo(map)
    .bindPopup('Sonva, Cuenca<br>Las Herrerías 2-12')
    .openPopup();
