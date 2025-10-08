document.addEventListener('DOMContentLoaded', () => {

    
     const images = [
        'img/lc2.jpeg',
        'img/lc1.jpeg',
        'img/lc3.jpeg',
        'img/lc4.jpeg'
    ];

    
    const anniversaryDate = new Date('2023-04-12T11:23:49'); 

    // --- Elementos da Página ---
    const startButton = document.getElementById('start-button');
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('background-music');
    const counter = document.getElementById('counter');

    // --- Elementos do Player de Áudio ---
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');

    // --- Elementos do Carrossel ---
    const trackContainer = document.querySelector('.carousel-track-container');
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let slides = [];
    let slideWidth = 0;
    let currentIndex = 0;

    function setupCarousel() {
        console.log("Iniciando setup do carrossel...");
        images.forEach(src => {
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            const img = document.createElement('img');
            img.src = src;
            slide.appendChild(img);
            track.appendChild(slide);
        });
        slides = Array.from(track.children);
        console.log(`Setup concluído. Total de slides: ${slides.length}`);
    }

    function startExperience() {
        splashScreen.style.display = 'none';
        mainContent.style.display = 'block';

        recalculateSlideWidth();
        moveToSlide(currentIndex);

        playMusic();
        createHearts();
        setInterval(updateCounter, 1000);
        updateCounter();

        window.addEventListener('resize', () => {
            recalculateSlideWidth();
            track.style.transition = 'none';
            moveToSlide(currentIndex);
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        });
    }
    
    function recalculateSlideWidth() {
        slideWidth = trackContainer.clientWidth;
        console.log(`Largura do slide recalculada para: ${slideWidth}px`);
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
    }

    // --- Player de Áudio ---
    function playMusic() { music.play(); playPauseBtn.textContent = '❚❚'; }
    function pauseMusic() { music.pause(); playPauseBtn.textContent = '▶'; }

    playPauseBtn.addEventListener('click', () => { music.paused ? playMusic() : pauseMusic(); });

    music.addEventListener('timeupdate', () => {
        if (music.duration) {
            progressBar.style.width = `${(music.currentTime / music.duration) * 100}%`;
        }
    });

    progressContainer.addEventListener('click', (event) => {
        if (music.duration) {
            music.currentTime = (event.offsetX / progressContainer.clientWidth) * music.duration;
        }
    });
    
    // ---Carrossel ---
    function moveToSlide(targetIndex) {
        console.log(`moveToSlide chamada com targetIndex: ${targetIndex}`);
        
        if (!slides.length) {
            console.error("Não há slides para mover.");
            return;
        }

        const newIndex = (targetIndex + slides.length) % slides.length;

        currentIndex = newIndex;
        
        const newTransform = -slideWidth * currentIndex;
        
        console.log(`Índice final: ${currentIndex}. Movendo para a posição: ${newTransform}px`);

        track.style.transform = `translateX(${newTransform}px)`;
    }

    nextButton.addEventListener('click', () => {
        console.log(`Botão PRÓXIMO clicado. Índice atual: ${currentIndex}`);
        moveToSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        console.log(`Botão ANTERIOR clicado. Índice atual: ${currentIndex}`);
        moveToSlide(currentIndex - 1);
    });
    
    // --- Contador de Tempo ---
    function updateCounter() {
        const now = new Date();
        const difference = now - anniversaryDate;
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24)) % 365;
        const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
        const minutes = Math.floor(difference / (1000 * 60)) % 60;
        const seconds = Math.floor(difference / 1000) % 60;
        counter.innerHTML = `${years} anos, ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;
    }

    // --- Função para criar corações animados ---
    function createHearts() {
        const heartCount = 30;
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`;
            heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            document.body.appendChild(heart);
        }
    }
    
    setupCarousel();
    startButton.addEventListener('click', startExperience);
});