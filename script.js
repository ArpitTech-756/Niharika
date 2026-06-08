// wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    initThemeToggle();
    initParticles();
    initHeroHearts();
    initAnimations();
    initCarousel();
    initSecretBox();
    initSurprise();

});

/* -------------------------------------------------------------------------- */
/* Theme Toggle                                                               */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = toggleBtn.querySelector('i');
    
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        
        if(document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

/* -------------------------------------------------------------------------- */
/* Floating Particles                                                         */
/* -------------------------------------------------------------------------- */
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize size, position, and animation duration
        const size = Math.random() * 20 + 5;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}vw`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

/* -------------------------------------------------------------------------- */
/* Hero Floating Hearts                                                       */
/* -------------------------------------------------------------------------- */
function initHeroHearts() {
    const container = document.getElementById('hero-hearts-container');
    if(!container) return;
    
    const heartCount = 15;
    
    for(let i=0; i<heartCount; i++) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'floating-heart');
        
        const size = Math.random() * 15 + 10; // 10px to 25px
        const left = Math.random() * 100; // 0 to 100%
        const duration = Math.random() * 10 + 8; // 8s to 18s
        const delay = Math.random() * 10; // 0s to 10s
        
        heart.style.fontSize = `${size}px`;
        heart.style.left = `${left}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        container.appendChild(heart);
    }
}

/* -------------------------------------------------------------------------- */
/* GSAP Animations                                                            */
/* -------------------------------------------------------------------------- */
function initAnimations() {
    
    // Hero Section
    gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
    
    gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });

    gsap.from(".cta-button", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "back.out(1.7)"
    });

    // Scroll to Memories on CTA click
    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('memories').scrollIntoView({ behavior: 'smooth' });
    });

    // Section Titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Polaroids
    gsap.utils.toArray('.polaroid').forEach((polaroid, i) => {
        gsap.from(polaroid, {
            scrollTrigger: {
                trigger: ".gallery-grid",
                start: "top 75%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "back.out(1.2)"
        });
    });

    // Feature Cards
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: ".features-grid",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: "power2.out"
        });
    });

    // Timeline Items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Letter
    gsap.from('.letter-container', {
        scrollTrigger: {
            trigger: "#message",
            start: "top 70%",
        },
        scale: 0.95,
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    // Wishes
    gsap.utils.toArray('.wish-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: ".wishes-grid",
                start: "top 80%",
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: "back.out(1.5)"
        });
    });
}

/* -------------------------------------------------------------------------- */
/* Quotes Carousel                                                            */
/* -------------------------------------------------------------------------- */
function initCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.quote-slide');
    const dots = document.querySelectorAll('.dot');
    
    if(!slides.length) return;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto advance
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

/* -------------------------------------------------------------------------- */
/* Secret Surprise Box                                                        */
/* -------------------------------------------------------------------------- */
function initSecretBox() {
    const checkBtn = document.getElementById('check-answer-btn');
    const answerInput = document.getElementById('secret-answer');
    const feedback = document.getElementById('secret-feedback');
    const hiddenBox = document.getElementById('hidden-gift-box');
    const questionContainer = document.querySelector('.question-container');
    
    // Modal elements
    const openLetterBtn = document.getElementById('open-letter-btn');
    const closeLetterBtn = document.getElementById('close-letter-btn');
    const letterModal = document.getElementById('letter-modal');
    const letterMusic = document.getElementById('letter-music');

    if(!checkBtn) return;

    checkBtn.addEventListener('click', () => {
        const answer = answerInput.value.trim().toLowerCase();
        
        if(answer === 'pagali' || answer === 'niharika') {
            feedback.textContent = 'Bilkul Sahi Jawab! 🌟';
            feedback.className = 'feedback-msg success';
            
            // Hide input, show gift box
            setTimeout(() => {
                questionContainer.style.display = 'none';
                hiddenBox.style.display = 'block';
                // Trigger small confetti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ec4899', '#8b5cf6', '#f59e0b']
                });
            }, 800);
        } else {
            feedback.textContent = 'Oops! Galat jawab, fir se try karo.';
            feedback.className = 'feedback-msg error';
            
            // Shake effect
            gsap.to(answerInput, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.4
            });
        }
    });

    // Allow Enter key
    answerInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkBtn.click();
        }
    });

    // Modal Events
    if(openLetterBtn) {
        openLetterBtn.addEventListener('click', () => {
            letterModal.classList.add('active');
            if(letterMusic) {
                letterMusic.currentTime = 0;
                letterMusic.play().catch(e => console.log('Audio autoplay blocked', e));
            }
        });
    }

    const closeLetterModal = () => {
        letterModal.classList.remove('active');
        if(letterMusic) {
            letterMusic.pause();
        }
    };

    if(closeLetterBtn) {
        closeLetterBtn.addEventListener('click', closeLetterModal);
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if(e.target === letterModal) {
            closeLetterModal();
        }
    });
}

/* -------------------------------------------------------------------------- */
/* Final Surprise (Confetti)                                                  */
/* -------------------------------------------------------------------------- */
function initSurprise() {
    const section = document.getElementById('surprise');
    const replayBtn = document.getElementById('replay-btn');

    function fireConfetti() {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ec4899', '#8b5cf6', '#f59e0b']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ec4899', '#8b5cf6', '#f59e0b']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    // Trigger on scroll into view
    ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        onEnter: () => fireConfetti()
    });

    // Replay button
    replayBtn.addEventListener('click', fireConfetti);
}
