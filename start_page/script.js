document.addEventListener('DOMContentLoaded', () => {
    // Crear el botón para activar/desactivar el micrófono
    const toggleMicrophoneButton = document.createElement('button');
    toggleMicrophoneButton.textContent = 'Activar Micrófono';
    document.body.appendChild(toggleMicrophoneButton);

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'es'; // Establecer el idioma a español

    // Función para activar el reconocimiento de voz
    function activateSpeechRecognition() {
        recognition.start();
        toggleMicrophoneButton.textContent = 'Desactivar Micrófono';
    }

    // Función para desactivar el reconocimiento de voz
    function deactivateSpeechRecognition() {
        recognition.stop();
        toggleMicrophoneButton.textContent = 'Activar Micrófono';
    }

    // Agregar evento al botón para alternar el estado del micrófono
    toggleMicrophoneButton.addEventListener('click', () => {
        if (recognition.active) {
            deactivateSpeechRecognition();
        } else {
            activateSpeechRecognition();
        }
    });

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript.toLowerCase();

        // Comandos de voz
        if (result.includes('pausa') || result.includes('detener')) {
            // Pausar el audio o detener comandos futuros
        } else if (result.includes('continuar')) {
            // Continuar la reproducción de audio
        } else if (result.includes('repetir')) {
            // Repetir la reproducción de audio
        } else if (result.includes('ir a mapa') || result.includes('mostrar mapa') || result.includes('mapa') || result.includes('abrir mapa') || result.includes('quiero ver mapa') || result.includes('avanzar')) {
            // Redirigir a la dirección del mapa
            window.location.href = 'https://brunetob.github.io/page_map/map.html';
        } else if (result.includes('volver') || result.includes('regresar') || result.includes('inicio') || result.includes('mostrar inicio') || result.includes('volver al inicio') || result.includes('retroceder')) {
            // Regresar al inicio
            window.location.href = 'https://tu-pagina-de-inicio.com';
        }
    };

    // Verificar y solicitar permisos de micrófono
    async function checkAudioPermissions() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            activateSpeechRecognition(); // Activar reconocimiento de voz al tener permisos
        } catch (error) {
            console.log('No se han concedido los permisos de micrófono.');
            toggleMicrophoneButton.textContent = 'Concede los permisos de micrófono';
        }
    }

    checkAudioPermissions();
});
