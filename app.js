// Base Routines Database
const routinesDatabase = {
    "Universidad": {
        "Escaleras": {
            "5": {
                title: "Subir Escaleras de la Facultad",
                instruction: "Sube 4 pisos utilizando las escaleras en lugar del ascensor. Mantén un paso ágil pero seguro."
            },
            "10": {
                title: "Pisos Acumulados en Campus",
                instruction: "Sube y baja las escaleras del pabellón 2 veces consecutivas. Concéntrate en la respiración."
            }
        },
        "Silla": {
            "5": {
                title: "Sentadillas de Aula",
                instruction: "Realiza 3 series de 10 sentadillas levantándote de la silla de estudio y volviendo a sentarte sin usar las manos."
            },
            "10": {
                title: "Pausa Activa del Estudiante",
                instruction: "Estiramientos lumbares sentándote al borde del asiento, rotaciones de cuello y elevaciones alternas de rodilla."
            }
        },
        "Nada específico": {
            "5": {
                title: "Paseo de Pasillo",
                instruction: "Camina a paso rápido por los pasillos principales del edificio durante este bloque para reactivar tu circulación."
            },
            "10": {
                title: "Circuito de Campus",
                instruction: "Realiza una caminata enérgica dando una vuelta completa al predio o edificio de la facultad."
            }
        }
    },
    "Oficina": {
        "Escaleras": {
            "5": {
                title: "Pausa de Escaleras de Oficina",
                instruction: "Sube 3 pisos por la escalera para romper el tiempo sedentario frente al monitor."
            },
            "10": {
                title: "Intervalos de Escalones",
                instruction: "Realiza intervalos: sube un piso a paso moderado, baja despacio, y repite controlando tu postura corporal."
            }
        },
        "Silla": {
            "5": {
                title: "Sentadillas de Escritorio",
                instruction: "Párate de tu silla de oficina y siéntate 15 veces. Controla el descenso para activar los cuádriceps."
            },
            "10": {
                title: "Estiramiento Ergonómico",
                instruction: "Usa la silla para realizar estiramientos profundos de pecho, espalda superior, hombros y extensión de piernas."
            }
        },
        "Nada específico": {
            "5": {
                title: "Pausa de Hidratación Lejana",
                instruction: "Camina a paso redoblado al dispenser de agua más lejano de tu piso y realiza estiramientos de pantorrilla al llegar."
            },
            "10": {
                title: "Pausa Activa en el Lugar",
                instruction: "Combina 1 minuto de caminata alta con 30 segundos de flexiones inclinadas apoyado en el borde del escritorio."
            }
        }
    },
    "Casa": {
        "Escaleras": {
            "5": {
                title: "Escalones Domésticos",
                instruction: "Sube y baja las escaleras de tu casa o edificio a ritmo continuo y constante."
            },
            "10": {
                title: "Desafío de Altura en Casa",
                instruction: "Realiza subidas rítmicas elevando rodillas y finaliza con estiramientos estáticos de gemelos en el escalón inferior."
            }
        },
        "Silla": {
            "5": {
                title: "Fondos de Tríceps en Silla",
                instruction: "Apoya las manos en el borde de una silla firme, desplaza la cadera al frente y realiza 3 series de 10 flexiones de brazo."
            },
            "10": {
                title: "Entrenamiento Funcional con Silla",
                instruction: "Combina sentadillas búlgaras apoyando un pie atrás en la silla con subidas frontales alternadas al asiento."
            }
        },
        "Nada específico": {
            "5": {
                title: "Estiramiento Dinámico Exprés",
                instruction: "Realiza rotaciones de cadera, estiramiento de isquiotibiales y giros de hombros para liberar tensiones."
            },
            "10": {
                title: "Circuito Cardio sin Elementos",
                instruction: "Alterna 30 segundos de saltos de tijera (jumping jacks), 30 segundos de rodillas arriba y 30 segundos de plancha isométrica."
            }
        }
    },
    "Aire libre": {
        "Escaleras": {
            "5": {
                title: "Escalinata Pública",
                instruction: "Busca escaleras en una plaza o parque y súbelas a paso rápido levantando bien los pies."
            },
            "10": {
                title: "Intervalos de Resistencia",
                instruction: "Sube la escalinata trotando suavemente y desciende caminando para recuperar el aliento. Repite."
            }
        },
        "Silla": {
            "5": {
                title: "Flexiones en Banco de Plaza",
                instruction: "Apoya las manos en el respaldo o asiento de un banco y realiza 15 flexiones inclinadas cuidando tu core."
            },
            "10": {
                title: "Circuito de Banco Urbano",
                instruction: "Combina subidas al banco alternadas (step-ups) con fondos de tríceps en el borde del asiento."
            }
        },
        "Nada específico": {
            "5": {
                title: "Caminata Enérgica",
                instruction: "Camina a paso militar balanceando los brazos vigorosamente para elevar tu frecuencia cardíaca."
            },
            "10": {
                title: "Intervalos de Trote y Caminata",
                instruction: "Alterna 1 minuto de trote a ritmo conversacional con 30 segundos de caminata rápida de recuperación."
            }
        }
    }
};

// Global variables for Timer State
let timerInterval = null;
let timeLeft = 0;
let totalDuration = 0;
let isPaused = false;
let currentRoutine = null;

// Audio synth beep for completion
function playCompletionSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // First note
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        gain1.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc1.start();
        osc1.stop(audioCtx.currentTime + 0.15);
        
        // Second note (a bit later)
        setTimeout(() => {
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
            gain2.gain.setValueAtTime(0.1, audioCtx.currentTime);
            osc2.start();
            osc2.stop(audioCtx.currentTime + 0.15);
        }, 150);

        // Third note
        setTimeout(() => {
            const osc3 = audioCtx.createOscillator();
            const gain3 = audioCtx.createGain();
            osc3.connect(gain3);
            gain3.connect(audioCtx.destination);
            osc3.frequency.setValueAtTime(783.99, audioCtx.currentTime); // G5
            gain3.gain.setValueAtTime(0.15, audioCtx.currentTime);
            osc3.start();
            osc3.stop(audioCtx.currentTime + 0.3);
        }, 300);
    } catch (e) {
        console.log("Audio API not supported or blocked by browser user gesture policies.");
    }
}

// Configurator selectors logic
function setupSelector(containerId) {
    const container = document.getElementById(containerId);
    const items = container.querySelectorAll('.selector-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
        });
    });
}

function getSelectedValue(containerId) {
    const container = document.getElementById(containerId);
    const selected = container.querySelector('.selector-item.selected');
    return selected ? selected.getAttribute('data-value') : null;
}

// Screen management states switching
function showState(stateId) {
    document.querySelectorAll('.screen-state').forEach(el => {
        el.classList.add('hidden');
    });
    const nextState = document.getElementById(stateId);
    nextState.classList.remove('hidden');
}

// Formatting seconds into MM:SS
function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// Update the circular SVG indicator
function updateTimerCircle() {
    const circle = document.getElementById('timer-progress');
    if (!circle) return;
    const circumference = 408; // 2 * Math.PI * r (65) = ~408
    
    if (totalDuration === 0) {
        circle.style.strokeDashoffset = 0;
        return;
    }
    
    const percentage = timeLeft / totalDuration;
    const offset = circumference - (percentage * circumference);
    circle.style.strokeDashoffset = offset;
}

// Timer Logic Controls
function startTimer(durationMinutes) {
    clearInterval(timerInterval);
    totalDuration = durationMinutes * 60;
    // For demo purposes, if it's 5 mins let's simulate a faster countdown (or real countdown?)
    // Let's run a real seconds countdown, but we could make it count down in half-seconds so the demo is faster if the user wishes.
    // Let's do 1 real second ticks, but we'll allow skipping to completion directly!
    timeLeft = totalDuration;
    isPaused = false;
    
    const textDisplay = document.getElementById('timer-text');
    const pauseBtn = document.getElementById('btn-pause');
    
    textDisplay.textContent = formatTime(timeLeft);
    updateTimerCircle();
    pauseBtn.textContent = "Pausar";
    
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            textDisplay.textContent = formatTime(timeLeft);
            updateTimerCircle();
            
            if (timeLeft <= 0) {
                completeTraining();
            }
        }
    }, 1000);
}

function completeTraining() {
    clearInterval(timerInterval);
    playCompletionSound();
    showState('state-success');
    triggerConfetti();
    
    // Auto-publish completed challenge to the social feed
    const feedContainer = document.getElementById('feed-container');
    if (feedContainer) {
        const postCard = document.createElement('div');
        postCard.classList.add('feed-card');
        postCard.style.animation = 'fadeIn 0.5s ease-out';
        
        postCard.innerHTML = `
            <div class="feed-header">
                <div class="feed-user">
                    <div class="user-avatar accent">TU</div>
                    <div class="user-info">
                        <h4>Tú (Nicolas O.)</h4>
                        <span>Hace un momento</span>
                    </div>
                </div>
                <span class="feed-badge" style="background: rgba(204, 255, 0, 0.1); border-color: rgba(204, 255, 0, 0.2); color: var(--accent);">Desafío Completado</span>
            </div>
            <div class="feed-content">
                <p>¡Acabo de completar mi reto de Pikisports! Realicé el desafío: <strong>"${currentRoutine.title}"</strong> (${getSelectedValue('time-selector')} min) en mi entorno de <strong>${getSelectedValue('location-selector')}</strong>. ¡Combatiendo el sedentarismo! 💪🔥</p>
            </div>
            <div class="feed-actions">
                <button class="action-btn" onclick="toggleLike(this)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    <span>0 Likes</span>
                </button>
                <button class="action-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                    <span>0 Comentarios</span>
                </button>
            </div>
        `;
        
        feedContainer.insertBefore(postCard, feedContainer.firstChild);
    }
}

// Confetti generator for success screen
function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    
    const colors = ['#ccff00', '#00f0ff', '#ffffff', '#ff3b30', '#adff2f'];
    
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `scale(${Math.random() * 0.8 + 0.4})`;
        
        // Randomize animations
        confetti.style.animationDelay = Math.random() * 1.5 + 's';
        confetti.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
        
        container.appendChild(confetti);
    }
}

// Like toggle interaction
window.toggleLike = function(btn) {
    btn.classList.toggle('liked');
    const span = btn.querySelector('span');
    let count = parseInt(span.textContent);
    
    if (btn.classList.contains('liked')) {
        count++;
        span.textContent = `${count} Likes`;
    } else {
        count--;
        span.textContent = `${count} Likes`;
    }
};

// Hero Mockup image switcher function
window.swapHeroMockup = function(imagePath, thumbEl) {
    const img = document.getElementById('hero-mockup-img');
    if (img) {
        img.src = imagePath;
    }
    // Update thumbnails active state
    const thumbs = document.querySelectorAll('.thumb-item');
    thumbs.forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
};

// Initializing event listeners on page load
document.addEventListener('DOMContentLoaded', () => {
    // Setup selectors
    setupSelector('location-selector');
    setupSelector('time-selector');
    setupSelector('equip-selector');
    
    // Configurator Action Button
    const btnGenerate = document.getElementById('btn-generate');
    btnGenerate.addEventListener('click', () => {
        const location = getSelectedValue('location-selector');
        const time = getSelectedValue('time-selector');
        const equip = getSelectedValue('equip-selector');
        
        // Find matching routine
        const locationRoutines = routinesDatabase[location] || {};
        const equipRoutines = locationRoutines[equip] || locationRoutines["Nada específico"] || {};
        const routine = equipRoutines[time] || {
            title: "Caminata Activa",
            instruction: "Camina a paso moderado para combatir el sedentarismo."
        };
        
        currentRoutine = routine;
        
        // Update timer UI layout contents
        document.getElementById('timer-badge').textContent = `${location} • ${equip}`;
        document.getElementById('timer-title').textContent = routine.title;
        document.getElementById('timer-instruction').textContent = routine.instruction;
        
        // Switch state and start counting down
        showState('state-timer');
        startTimer(parseInt(time));
    });
    
    // Timer Control Actions
    const btnPause = document.getElementById('btn-pause');
    btnPause.addEventListener('click', () => {
        isPaused = !isPaused;
        btnPause.textContent = isPaused ? "Reanudar" : "Pausar";
        btnPause.classList.toggle('btn-primary', isPaused);
    });
    
    const btnSkip = document.getElementById('btn-skip');
    btnSkip.addEventListener('click', () => {
        clearInterval(timerInterval);
        showState('state-config');
    });
    
    // Success Button Action
    const btnSuccessFinish = document.getElementById('btn-success-finish');
    btnSuccessFinish.addEventListener('click', () => {
        showState('state-config');
    });

    // FAQ Accordion Toggle Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active')); // close others
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Hero Stats Counter Anim
    const animateStats = () => {
        const stats = [
            { selector: '.hero-stats .stat-item:nth-child(1) h4', target: 80, suffix: '%' },
            { selector: '.hero-stats .stat-item:nth-child(2) h4', target: 10, suffix: ' min' },
            { selector: '.hero-stats .stat-item:nth-child(3) h4', target: 50, suffix: 'k' }
        ];
        
        stats.forEach(stat => {
            const el = document.querySelector(stat.selector);
            if (!el) return;
            let current = 0;
            const steps = 25;
            const increment = stat.target / steps;
            const intervalTime = 30;
            
            let stepCount = 0;
            const interval = setInterval(() => {
                current += increment;
                stepCount++;
                if (stepCount >= steps) {
                    clearInterval(interval);
                    el.innerHTML = `${stat.target}<span>${stat.suffix}</span>`;
                } else {
                    let displayVal = Math.round(current);
                    el.innerHTML = `${displayVal}<span>${stat.suffix}</span>`;
                }
            }, intervalTime);
        });
    };
    
    // Trigger count animation after a slight delay
    setTimeout(animateStats, 300);

    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // Parallax scroll and 3D rotation effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // 3D Rotating Phone Group (Hero section)
        const phoneGroup = document.getElementById('scroll-phone-group');
        
        if (phoneGroup && scrolled < 900) {
            // Rotates the entire group on its own axis as scroll progresses
            phoneGroup.style.transform = `perspective(1500px) rotateX(${8 + scrolled * 0.02}deg) rotateY(${-8 - scrolled * 0.04}deg) rotateZ(${-2 - scrolled * 0.01}deg) translateY(${scrolled * 0.03}px)`;
        }
        
        // CTA office worker parallax
        const ctaImg = document.querySelector('.cta-athlete-img');
        const ctaGlow = document.querySelector('.cta-athlete-glow-bg');
        const ctaSection = document.querySelector('.cta-section');
        if (ctaImg && ctaSection) {
            const rect = ctaSection.getBoundingClientRect();
            const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            
            if (rect.top <= viewHeight && rect.bottom >= 0) {
                const relativeScroll = viewHeight - rect.top;
                ctaImg.style.transform = `translateY(${relativeScroll * -0.05}px) scale(${0.97 + relativeScroll * 0.00008})`;
                if (ctaGlow) {
                    ctaGlow.style.transform = `translate(-50%, calc(-50% + ${relativeScroll * 0.015}px))`;
                }
            }
        }
    });
});
