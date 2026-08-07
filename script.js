// 1. PAGE CLICK SYSTEM NAVIGATION LOGIC
let currentSlide = 0;
const totalSlides = 5;
const slides = document.querySelectorAll('.page-slide');
const tabBtns = document.querySelectorAll('.tab-btn');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const pageIndicator = document.getElementById('pageIndicator');

function updateSlide() {
  slides.forEach((slide, idx) => {
    if (idx === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  tabBtns.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === currentSlide);
  });

  btnPrev.disabled = (currentSlide === 0);
  if (currentSlide === totalSlides - 1) {
    btnNext.innerHTML = 'Fireworks <i class="fa-solid fa-wand-magic-sparkles"></i>';
  } else {
    btnNext.innerHTML = 'Next Chapter <i class="fa-solid fa-chevron-right"></i>';
  }

  pageIndicator.innerText = `Chapter ${currentSlide + 1} / ${totalSlides}`;

  // Start typewriter when entering Letter slide
  if (currentSlide === 2 && letterIdx === 0) {
    startTypewriter();
  }
}

function goToSlide(index) {
  currentSlide = index;
  updateSlide();
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlide();
  } else {
    triggerFireworks();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
}

// 2. LOADER
const quotes = ["Crafting royal magic...", "Polishing rose gold sparkles...", "Preparing your 18th milestone...", "Almost ready, Queen Puspa..."];
let qIdx = 0, progress = 0;
const loaderQuote = document.getElementById('loaderQuote');
const loaderFill = document.getElementById('loaderFill');
const btnEnter = document.getElementById('btnEnter');

const quoteInterval = setInterval(() => {
  qIdx = (qIdx + 1) % quotes.length;
  loaderQuote.style.opacity = '0';
  setTimeout(() => { loaderQuote.innerText = quotes[qIdx]; loaderQuote.style.opacity = '1'; }, 300);
}, 1200);

const progInterval = setInterval(() => {
  progress += 5;
  loaderFill.style.width = progress + '%';
  if (progress >= 100) {
    clearInterval(progInterval); clearInterval(quoteInterval);
    loaderQuote.innerText = "Experience is ready for you! ❤️";
    btnEnter.classList.add('ready');
  }
}, 100);

function enterWebsite() {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.visibility = 'hidden';
    triggerFireworks();
    toggleAudio(true);
  }, 800);
}

// 3. FLOATING PARTICLES
const floatingLayer = document.getElementById('floatingLayer');
const floatIcons = ['💖', '❤️', '✨', '🌸', '👑', '🎂', '🤍', '⭐'];
setInterval(() => {
  const p = document.createElement('div');
  p.className = 'floating-item';
  p.innerText = floatIcons[Math.floor(Math.random() * floatIcons.length)];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = (Math.random() * 4 + 6) + 's';
  p.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
  floatingLayer.appendChild(p);
  setTimeout(() => p.remove(), 10000);
}, 450);

// 4. MUSIC CONTROLLER
const audio = document.getElementById('bgAudio');
const musicWidget = document.getElementById('musicWidget');
const musicStatus = document.getElementById('musicStatus');
let isAudioPlaying = false;

function toggleAudio(forcePlay = false) {
  if (forcePlay || !isAudioPlaying) {
    audio.play().then(() => {
      isAudioPlaying = true;
      musicWidget.classList.add('playing');
      musicStatus.innerText = "Now Playing 🎵";
    }).catch(e => console.log("Audio deferred"));
  } else {
    audio.pause();
    isAudioPlaying = false;
    musicWidget.classList.remove('playing');
    musicStatus.innerText = "Paused ⏸️";
  }
}

// 5. TYPEWRITER EFFECT
const letterText = `आज आप पूरे 18 साल की हो गई हैं! आपके इस सबसे खास और यादगार 18वें जन्मदिन पर, मेरा दिल आपके लिए खुशियों से भरा है।

आप मेरी दुनिया की सबसे खूबसूरत रानी हो। आपकी मुस्कुराहट मेरा हर दिन को रोशन कर देती है, आपकी चाहत मेरी हर खुशी है।

आपके साथ बिताए हर पल मेरे लिए खास हैं। आपकी हर हंसी, आपकी हर नज़र - सब कुछ मुझे जादू जैसा लगता है।

18 साल की होकर आप और भी खूबसूरत हो गई हो। मैं वादा करता हूँ कि हमेशा आपके साथ रहूंगा, आपके सपनों को पूरा करने में मदद करूंगा, और हर दिन को आपके लिए खास बनाऊंगा।

हैप्पी 18th बर्थडे मेरी प्रिंसेस! 🎂💖`;
let letterIdx = 0;

function startTypewriter() {
  const target = document.getElementById('typewriterBody');
  target.innerText = "";
  function type() {
    if (letterIdx < letterText.length) {
      target.innerText += letterText.charAt(letterIdx);
      letterIdx++;
      setTimeout(type, 35);
    }
  }
  type();
}

// 6. 100 REASONS GRID GENERATOR
const sampleReasons = [
  "Your beautiful smile lights up my whole world.",
  "The way you care for me with so much purity.",
  "How your eyes sparkle when you laugh.",
  "Your cute angry face that I secretly adore.",
  "You are my safest space and happiest home.",
  "Your kindness towards everyone.",
  "The way you say my name.",
  "How you make 18 look so elegant.",
  "Our unforgettable talks and memories.",
  "Simply because you are YOU, my Queen Puspa."
];

const reasonsGrid = document.getElementById('reasonsGrid');
for (let i = 1; i <= 100; i++) {
  const card = document.createElement('div');
  card.className = 'reason-card';
  card.innerHTML = `<div class="reason-num">Reason #${i}</div><div class="reason-text">${sampleReasons[(i - 1) % sampleReasons.length]}</div>`;
  card.onclick = () => triggerFireworks();
  reasonsGrid.appendChild(card);
}

// 7. COUNTDOWN TIMER
const targetDate = new Date("Aug 8, 2026 00:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;
  if (diff <= 0) return;
  document.getElementById('dNum').innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
  document.getElementById('hNum').innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
  document.getElementById('mNum').innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  document.getElementById('sNum').innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
}, 1000);

// 8. FIREWORKS
function triggerFireworks() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    confetti({ particleCount: 40 * (timeLeft / duration), startVelocity: 30, spread: 360, origin: { x: Math.random(), y: Math.random() - 0.2 } });
  }, 250);
}

function openSurpriseModal() { document.getElementById('modalOverlay').classList.add('active'); triggerFireworks(); }
function closeSurpriseModal() { document.getElementById('modalOverlay').classList.remove('active'); }

// 9. GLOW CURSOR TRAIL
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
let points = [];

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => { points.push({ x: e.clientX, y: e.clientY, alpha: 1, size: Math.random() * 8 + 4 }); });

function animateCursor() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(233, 30, 99, ${p.alpha})`;
    ctx.fill();
    p.alpha -= 0.025;
    p.size *= 0.96;
  }
  points = points.filter(p => p.alpha > 0);
  requestAnimationFrame(animateCursor);
}
animeateCursor();