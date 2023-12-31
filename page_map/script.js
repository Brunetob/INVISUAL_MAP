// Inicializar el mapa en el div "map" y hacer zoom en las coordenadas de Sonva
const map = L.map('map').setView([-2.9127463739190893, -78.99484858021965], 19);

// Añadir capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Variable para almacenar la capa de marcadores de obstáculos
let obstaclesLayer = L.layerGroup().addTo(map);

// ***Crear un marcador en las coordenadas iniciales (Sonva) y agregarlo al mapa ***
//crear ícono del marcador
var sonva_Pin = L.icon({
    iconUrl: 'https://png.pngtree.com/png-vector/20230313/ourmid/pngtree-building-location-pointer-vector-png-image_6647661.png',

    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [50, 46],
    shadowSize:   [50, 64], // size of the shadow
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const initialMarker = L.marker([-2.9127463739190893, -78.99484858021965], {icon: sonva_Pin}).addTo(map);// marcador creado

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
        checkProximity(userMarker.getLatLng());
    } else {
        // Crea un marcador en la ubicación actual del usuario y agrégalo al mapa
        var person_pin = L.icon({
            iconUrl: 'https://cdn.icon-icons.com/icons2/882/PNG/512/1-18_icon-icons.com_68869.png',
        
            iconSize:     [50, 50], // size of the icon
            iconAnchor:   [30, 46],
            shadowSize:   [50, 64], // size of the shadow
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        userMarker = L.marker([userLat, userLng], {icon: person_pin}).addTo(map);

        // Asigna una etiqueta al marcador que se muestra al pasar el mouse o al hacer clic
        userMarker.bindPopup('Mi Ubicación Actual');
    }
}

// Llama a la función para actualizar la ubicación del marcador del usuario
navigator.geolocation.watchPosition(updateUserLocationMarker);
// Función para verificar la proximidad de obstáculos
function checkProximity(userLatLng) {
    obstaclesCoordinates.forEach(coord => {
        const distance = getDistance(userLatLng.lat, userLatLng.lng, coord[0], coord[1]);
        if (distance <= 2) {
            const description = coord[2];
            const message = `Precaución, a 2 metros hay ${description}`;
            speakMessage(message);
            alert(message);
        }
    });
}

// Función para reproducir un mensaje de voz
function speakMessage(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
}

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
    [-2.912340899266914, -78.9958238813347],
    [-2.912612791825163, -78.9954061272837],
    [-2.9126382398940196, -78.9948804143211],
    [-2.9135296615511828, -78.99480632909636],
    [-2.91289023435281, -78.99554498973605],
    [-2.9127152896138107, -78.99615215452314],
    [-2.912347523173246, -78.99583060607564]
]).addTo(map);

//******************************Marcadores de los obstáculos******************************
//crear ícono del marcador
var obsOneIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1673/1673264.png',

    iconSize:     [20, 30], // size of the icon
    iconAnchor:   [10, 40],
    shadowSize:   [50, 64], // size of the shadow
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Coordenadas de los obstáculos y sus descripciones
const obstaclesCoordinates = [
    [-2.9126727, -78.9948454, 'un poste'],
    [-2.9126111, -78.9951817, 'un poste'],
    [-2.9126074, -78.9954261, 'un poste'],
    [-2.9125468, -78.9955485, 'un poste'],
    [-2.9124919, -78.9956085, 'un poste'],
    [-2.9123530, -78.9958050, 'Cable alto 2'],
    [-2.9124095, -78.9958496, 'un poste'], // De las Acacias - poste
    [-2.9124856, -78.9959069, 'una bajada'], // De las Acacias - bajada
    [-2.9127032, -78.9961027, 'un poste y cable'], // De las Acacias - poste y cable
    [-2.9127692, -78.9961292, 'un cable'], // De las Acacias - cable
    [-2.9128177, -78.9959435, 'dos parrillas'], // De las Acacias - parrillas 2
    [-2.9128465, -78.9957980, 'un poste, un cable y dos parrillas'], // De las Acacias - poste y cable dos parrillas
    [-2.9129188, -78.9955727, 'un poste, un cable y dos parrillas'], // De las Acacias - poste cable y dos parrillas
    [-2.9129999, -78.9954335, 'una parrilla'], // De las Acacias - parrila
    [-2.9130310, -78.9953651, 'un poste y una parrilla'], // De las Acacias - poste parrila reves
    [-2.9132259, -78.9951388, 'un poste'], // De las Acacias - Poste
    [-2.9134238, -78.9948961, 'un cable y un poste'], // De las Acacias - cable poste
    [-2.9134107, -78.9947757, 'una bajada'], // Herrerías - bajada
    [-2.9131271, -78.9948139, 'una bajada'], // Herrerías - bajada
    [-2.9127179, -78.9948257, 'un poste, un cable y una bajada']  // Herrerías - poste cable bajada
];

// Agregar los marcadores de obstáculos al mapa
obstaclesCoordinates.forEach(coord => {
    //L.marker(coord, { icon: obsOneIcon }).addTo(map);
    L.marker(coord, { icon: obsOneIcon }).addTo(obstaclesLayer);
});

/*Comandos de voz */
document.addEventListener('DOMContentLoaded', () => {
    const toggleMicrophoneButton = document.getElementById('toggleMicrophoneButton');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

    recognition.lang = 'es'; // Establece el idioma a español

    let microphoneEnabled = false;

    // Función para activar/desactivar el micrófono
    toggleMicrophoneButton.addEventListener('click', () => {
        if (microphoneEnabled) {
            recognition.stop();
            microphoneEnabled = false;
            toggleMicrophoneButton.textContent = 'Activar Micrófono';
        } else {
            recognition.start();
            microphoneEnabled = true;
            toggleMicrophoneButton.textContent = 'Desactivar Micrófono';
        }
    });

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript.toLowerCase();
        console.log('Comando de voz detectado:', result);

        // Comandos de voz
        if (result.includes('reproducir comandos') || result.includes('repetir comandos') || result.includes('volver a escuchar comandos')) {
            const commands = "Para volver a escuchar los comandos de voz y poder navegar por la página, pruebe a decir: ir a mapa, mostrar mapa, mapa, abrir mapa, quiero ver mapa, avanzar. Para detener los audios en cualquier caso, diga: detener audios, parar, detener, quitar. Para ir al inicio o volver, diga: volver, regresar, inicio, mostrar inicio, volver al inicio, retroceder.";
            speakMessage(commands);
        } else if (result.includes('detener audios') || result.includes('parar') || result.includes('detener') || result.includes('quitar')) {
            speechSynthesis.cancel();
        } else if (result.includes('ir a mapa') || result.includes('mostrar mapa') || result.includes('mapa') || result.includes('abrir mapa') || result.includes('quiero ver mapa') || result.includes('avanzar')) {
            window.location.href = 'https://brunetob.github.io/page_map/map.html';
        } else if (result.includes('volver') || result.includes('regresar') || result.includes('inicio') || result.includes('mostrar inicio') || result.includes('volver al inicio') || result.includes('retroceder')) {
            window.location.href = 'https://invisual-map.vercel.app';
        } else if (result.includes('crear obstáculo')) {
            createObstacleMarker(userMarker.getLatLng());
        }
    };
    //***********Función para guardar datos en firebase
    async function createObstacleMarker(latlng) {
        const description = 'Nuevo obstáculo';

        // Agregar los datos del obstáculo a la base de datos
        try {
            await db.collection("Descripcion").add({
                Obstaculos: description,
                Latitud: latlng.lat,
                Longitud: latlng.lng,
            });
            speakMessage('Nuevo obstáculo creado y almacenado en la base de datos.');
        } catch (error) {
            console.error("Error al guardar el obstáculo en la base de datos:", error);
            speakMessage('Ha ocurrido un error al guardar el obstáculo.');
        }

        // Agregar el marcador en el mapa
        L.marker([latlng.lat, latlng.lng], { icon: obsOneIcon }).addTo(obstaclesLayer);
    }
    //***********Fin función para guardar datos en firebase
    function speakMessage(message) {
        const utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    }

    async function checkAudioPermissions() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            microphoneEnabled = true;
            toggleMicrophoneButton.textContent = 'Desactivar Micrófono';
            recognition.start();
        } catch (error) {
            toggleMicrophoneButton.disabled = true;
            toggleMicrophoneButton.textContent = 'Micrófono no disponible';
        }
    }

    checkAudioPermissions();
});
