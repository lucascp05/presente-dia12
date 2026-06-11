// ─── Corações flutuantes ───────────────────────────────────
const container = document.querySelector('.coracoes-bg');
const simbolos = ['♡', '♥', '❤', '💕', '💗'];

function criarCoracao() {
  if (container.querySelectorAll('.coracao-flut').length >= 21) return;
  const el = document.createElement('span');
  el.className = 'coracao-flut';
  el.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (Math.random() * 1.2 + 0.7) + 'rem';
  el.style.animationDuration = (Math.random() * 6 + 7) + 's';
  el.style.animationDelay = (Math.random() * 4) + 's';
  container.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

setInterval(criarCoracao, 900);
for (let i = 0; i < 5; i++) criarCoracao();

// ─── Música — retoma de onde parou ──────────────────────────
const musica = document.getElementById('musica');
const toggle = document.getElementById('musicToggle');

const tempo = parseFloat(sessionStorage.getItem('musicaTempo') || '0');
musica.currentTime = tempo;
musica.volume = 0.7;
musica.play().catch(() => {});

setInterval(() => {
  if (!musica.paused) sessionStorage.setItem('musicaTempo', musica.currentTime);
}, 1000);

// ─── Botão pausar/tocar ─────────────────────────────────────
let tocando = true;

toggle.addEventListener('click', () => {
  if (tocando) {
    musica.pause();
    toggle.textContent = '▶';
    toggle.setAttribute('aria-label', 'tocar música');
  } else {
    musica.play().catch(() => {});
    toggle.textContent = '⏸';
    toggle.setAttribute('aria-label', 'pausar música');
  }
  tocando = !tocando;
});

// ─── Fade-in das seções ao rolar ────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.galeria, .carta-secao').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(el);
});


// ─── Contador ───────────────────────────────────────────────
function atualizarContador() {
  const inicio = new Date('2021-06-21T00:00:00');
  const agora  = new Date();
  const diff   = agora - inicio;

  const segundosTotal = Math.floor(diff / 1000);
  const minutosTotal  = Math.floor(segundosTotal / 60);
  const horasTotal    = Math.floor(minutosTotal / 60);
  const diasTotal     = Math.floor(horasTotal / 24);

  const anos   = Math.floor(diasTotal / 365);
  const meses  = Math.floor((diasTotal % 365) / 30);
  const dias   = Math.floor((diasTotal % 365) % 30);
  const horas  = horasTotal % 24;
  const minutos = minutosTotal % 60;
  const segundos = segundosTotal % 60;

  document.getElementById('anos').textContent    = anos;
  document.getElementById('meses').textContent   = meses;
  document.getElementById('dias').textContent    = String(dias).padStart(2, '0');
  document.getElementById('horas').textContent   = String(horas).padStart(2, '0');
  document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
  document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
}

atualizarContador();
setInterval(atualizarContador, 1000);

// ─── Para disco quando música pausada ───────────────────────
const disco = document.getElementById('disco');
toggle.addEventListener('click', () => {
  if (tocando) {
    disco.style.animationPlayState = 'paused';
  } else {
    disco.style.animationPlayState = 'running';
  }
});