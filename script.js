document.addEventListener('DOMContentLoaded', function() {
    const pads = document.querySelectorAll('.pad');

    // Preload all sounds and store their loop state
    const sounds = {};
    pads.forEach(pad => {
        const soundFile = pad.getAttribute('data-sound');
        sounds[soundFile] = {
            audio: new Audio(soundFile),
            isLooping: false // Track whether the sound is looping
        };
    });

    // Add event listeners to pads for both touch and click
    pads.forEach(pad => {
        pad.addEventListener('click', handlePadInteraction);
        pad.addEventListener('touchstart', handlePadInteraction);
    });

    function handlePadInteraction(event) {
        event.preventDefault(); // Prevent default touch behavior
        const soundFile = this.getAttribute('data-sound');
        const sound = sounds[soundFile];

        if (sound) {
            if (sound.isLooping) {
                // Stop the loop
                sound.audio.loop = false;
                sound.audio.pause();
                sound.audio.currentTime = 0;
                sound.isLooping = false;
                this.style.backgroundColor = '#333'; // Reset pad color
            } else {
                // Start the loop
                sound.audio.loop = true;
                sound.audio.play();
                sound.isLooping = true;
                this.style.backgroundColor = '#007bff'; // Highlight pad color
            }
        }
    }
});
