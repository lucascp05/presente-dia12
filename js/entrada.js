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

setInterval(criarCoracao, 600);
for (let i = 0; i < 5; i++) criarCoracao();

// ─── Música ─────────────────────────────────────────────────
const btn    = document.getElementById('btnEntrar');
const musica = document.getElementById('musica');

musica.volume = 0;

btn.addEventListener('click', () => {
  btn.classList.add('pulse');

  musica.play().catch(() => {});

  const fadeIn = setInterval(() => {
    if (musica.volume < 0.68) {
      musica.volume = Math.min(0.7, musica.volume + 0.05);
    } else {
      musica.volume = 0.7;
      clearInterval(fadeIn);
    }
  }, 100);

  setTimeout(() => {
    sessionStorage.setItem('musicaTempo', musica.currentTime);
    window.location.href = 'principal.html';
  }, 600);
});