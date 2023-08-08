document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.volume = 0.5; // Establece el volumen a la mitad
    let audioStartTime = 0;
    
    // Inicia la reproducción del audio después de 2 segundos
    setTimeout(() => {
        audioPlayer.play();
        audioStartTime = audioPlayer.currentTime;
    }, 2000);

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

    recognition.lang = 'es'; // Establece el idioma a español

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript.toLowerCase();

        if (result.includes('pausa') || result.includes('detener')) {
            audioPlayer.pause();
        } else if (result.includes('continuar')) {
            audioPlayer.play();
        } else if (result.includes('repetir')) {
            audioPlayer.currentTime = audioStartTime;
            audioPlayer.play();
        }
    };

    async function checkAudioPermissions() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            recognition.start();
        } catch (error) {
            audioPlayer.parentNode.removeChild(audioPlayer);
            document.body.textContent = "Por favor concede los permisos de micrófono para el funcionamiento de la página.";
        }
    }

    checkAudioPermissions();
});
