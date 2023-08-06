// Inicializar el mapa en el div "map" y hacer zoom en las coordenadas dadas
const map = L.map('map').setView([-2.9127463739190893, -78.99484858021965], 18);

// Establecer el límite máximo de zoom a 25
map.options.maxZoom = 18;

// Añadir capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Crear un marcador en las coordenadas especificadas y agregarlo al mapa
const marker = L.marker([-2.9127463739190893, -78.99484858021965]).addTo(map);

// Asignar una etiqueta al marcador que se muestra al pasar el mouse o al hacer clic
marker.bindPopup('Sonva');

// Función para mostrar el popup al hacer clic en el marcador
function openPopupOnClick(e) {
    marker.openPopup();
}

// Asignar el evento clic para mostrar el popup
marker.on('click', openPopupOnClick);

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
