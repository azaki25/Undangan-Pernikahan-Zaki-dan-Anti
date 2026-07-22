document.addEventListener("DOMContentLoaded", function() {
    const cover = document.getElementById("cover");
    const openBtn = document.getElementById("open-btn");
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");
    const musicIcon = document.getElementById("music-icon");

    let isPlaying = false;

    // Read Dynamic Guest Name from URL Parameter (?to=NamaTamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');

    if (guestName) {
        document.getElementById('guest-name').innerText = guestName;
    }

    // Buka Undangan & Play Music
    openBtn.addEventListener("click", function() {
        cover.classList.add("open");
        
        bgMusic.play().then(() => {
            isPlaying = true;
            musicIcon.className = "fa-solid fa-compact-disc fa-spin";
        }).catch(err => {
            console.log("Autoplay ditolak:", err);
        });
    });

    // Toggle Music Play/Pause
    musicBtn.addEventListener("click", function() {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.className = "fa-solid fa-music";
        } else {
            bgMusic.play();
            musicIcon.className = "fa-solid fa-compact-disc fa-spin";
        }
        isPlaying = !isPlaying;
    });

    // Countdown Timer (Target: 20 Agustus 2026 10:00:00)
    const targetDate = new Date("August 20, 2026 10:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days < 10 ? '0' + days : days;
            document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
        } else {
            document.getElementById("timer").innerHTML = "<p>Acara Telah Berlangsung</p>";
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});
