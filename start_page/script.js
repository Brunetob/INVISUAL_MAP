document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioPermissionAlert = document.getElementById('audioPermissionAlert');
    
    audioPermissionAlert.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioPermissionAlert.style.display = 'none';
            audioPlayer.currentTime = 0; // Reinicia la reproducción al inicio
            audioPlayer.play();
            localStorage.setItem('audioPermissions', 'granted');
            initSpeechRecognition();
        } catch (error) {
            audioPermissionAlert.style.display = 'flex';
        }
    });

    function initSpeechRecognition() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        
        recognition.lang = 'es'; // Establece el idioma a español
        let audioStartTime = 0;

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript.toLowerCase();

            if (result.includes('pausa') || result.includes('detener')) {
                audioPlayer.pause();
            } else if (result.includes('reproducir desde el principio')) {
                audioPlayer.currentTime = 0;
                audioPlayer.play();
                audioStartTime = 0;
            } else if (result.includes('reproducir de nuevo')) {
                audioPlayer.currentTime = audioStartTime;
                audioPlayer.play();
            }

            recognition.stop();
        };

        recognition.onend = () => {
            recognition.start();
        };

        recognition.start();
    }

    // Comprobación inicial de permisos
    const audioPermissions = localStorage.getItem('audioPermissions');
    if (audioPermissions === 'granted') {
        audioPermissionAlert.style.display = 'none';
        audioPlayer.currentTime = 0; // Reinicia la reproducción al inicio
        audioPlayer.play();
        initSpeechRecognition();
    } else {
        audioPermissionAlert.style.display = 'flex';
    }

    // Verificación de permisos al cargar la página
    window.addEventListener('focus', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            localStorage.setItem('audioPermissions', 'granted');
        } catch (error) {
            localStorage.removeItem('audioPermissions');
        }
    });
});
