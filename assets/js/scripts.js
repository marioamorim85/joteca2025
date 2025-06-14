// Countdown Timer
function updateCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Só executa se todos os elementos existirem
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const eventDate = new Date('2025-07-01T14:00:00');
    const now = new Date();
    const diff = eventDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    
    if (diff < 0) {
        clearInterval(countdownInterval);
        daysEl.textContent = "0";
        hoursEl.textContent = "0";
        minutesEl.textContent = "0";
        secondsEl.textContent = "0";
    }
}

// Só ativa o countdown se existir o elemento #days
if (document.getElementById('days') && document.getElementById('hours') && document.getElementById('minutes') && document.getElementById('seconds')) {
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Particles.js Configuration
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#010DAC', '#29B0E6', '#930CF1', '#D865FF']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#29B0E6',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Three.js Configuration — apenas fundo dinâmico
if (document.getElementById('three-js')) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-js').appendChild(renderer.domElement);

    // Estrelas ou pontos no fundo para profundidade
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1500;
    const starVertices = [];

    for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.2,
        transparent: true,
        opacity: 0.3
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 500;

    function animate() {
        requestAnimationFrame(animate);
        stars.rotation.y += 0.002;
        stars.rotation.x += 0.0015;
        stars.rotation.z += 0.001;
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}

// Initialize Swiper
if (typeof Swiper !== 'undefined' && document.querySelector('.highlights-slider')) {
    const swiper = new Swiper('.highlights-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav ul li a');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Scroll animations
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;

    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }

    // Adiciona o evento de scroll
    window.addEventListener('scroll', updateNavbar);
    
    // Verifica a posição inicial
    updateNavbar();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar efeitos de scroll
    handleScrollAnimations();
    handleNavbarScroll();
    
    // Verificar se estamos na página de comissão
    if (document.body.classList.contains('comissao-page')) {
        // Garantir que a navbar está transparente inicialmente
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.webkitBackdropFilter = 'none';
            header.style.boxShadow = 'none';
        }

        // Inicializar efeitos de partículas e Three.js
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#010DAC', '#29B0E6', '#930CF1', '#D865FF']
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.5,
                        random: true
                    },
                    size: {
                        value: 3,
                        random: true
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#29B0E6',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }

        // Inicializar Three.js
        if (typeof THREE !== 'undefined' && document.getElementById('three-js')) {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true });

            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('three-js').appendChild(renderer.domElement);

            // Estrelas ou pontos no fundo para profundidade
            const starGeometry = new THREE.BufferGeometry();
            const starCount = 1500;
            const starVertices = [];

            for (let i = 0; i < starCount; i++) {
                const x = (Math.random() - 0.5) * 2000;
                const y = (Math.random() - 0.5) * 2000;
                const z = (Math.random() - 0.5) * 2000;
                starVertices.push(x, y, z);
            }

            starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

            const starMaterial = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 1.2,
                transparent: true,
                opacity: 0.3
            });

            const stars = new THREE.Points(starGeometry, starMaterial);
            scene.add(stars);

            camera.position.z = 500;

            function animate() {
                requestAnimationFrame(animate);
                stars.rotation.y += 0.002;
                stars.rotation.x += 0.0015;
                stars.rotation.z += 0.001;
                renderer.render(scene, camera);
            }

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });

            animate();
        }
    }
});

// --- FILTROS DO PROGRAMA ---
document.addEventListener('DOMContentLoaded', function() {
    // Estado inicial
    let periodoAtivo = 'tarde';
    let tipoAtivo = 'all';
    let termoPesquisa = '';

    const blocks = document.querySelectorAll('.programa-block');
    const periodTabs = document.querySelectorAll('.period-tab');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('programa-search');

    function filtrarPrograma() {
        blocks.forEach(block => {
            // Período
            const periodoOk = block.classList.contains('periodo-' + periodoAtivo);
            // Tipo
            let tipoOk = tipoAtivo === 'all';
            if (!tipoOk) tipoOk = block.classList.contains('tipo-' + tipoAtivo);
            // Pesquisa
            let pesquisaOk = true;
            if (termoPesquisa.length > 1) {
                const texto = block.innerText.toLowerCase();
                pesquisaOk = texto.includes(termoPesquisa);
            }
            // Mostrar ou ocultar
            if (periodoOk && tipoOk && pesquisaOk) {
                block.style.display = '';
            } else {
                block.style.display = 'none';
            }
        });
    }

    // Tabs de período
    periodTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            periodTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            periodoAtivo = this.getAttribute('data-period');
            filtrarPrograma();
        });
    });

    // Botões de tipo
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            tipoAtivo = this.getAttribute('data-filter');
            filtrarPrograma();
        });
    });

    // Pesquisa
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            termoPesquisa = this.value.trim().toLowerCase();
            filtrarPrograma();
        });
    }

    // Estado inicial: só tarde
    filtrarPrograma();
}); 