document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const header = document.getElementById('siteHeader');
const progress = document.getElementById('scrollProgress');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

const updateScrollUi = () => {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 18);
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0}%`;
};

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    updateScrollUi();
    scrollTicking = false;
  });
}, { passive: true });
updateScrollUi();

const setMenu = (open) => {
  if (!menuToggle || !mobileNav) return;
  menuToggle.classList.toggle('open', open);
  mobileNav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
};
menuToggle?.addEventListener('click', () => setMenu(!mobileNav?.classList.contains('open')));
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
window.addEventListener('resize', () => { if (window.innerWidth > 1040) setMenu(false); }, { passive: true });

const reveals = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-text');
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.03, rootMargin: '0px 0px 7% 0px' });

  reveals.forEach((el, index) => {
    el.style.animationDelay = `${Math.min((index % 3) * 24, 48)}ms`;
    observer.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

if (!prefersReducedMotion && finePointer) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    let frame = 0;
    card.addEventListener('pointermove', (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - .5;
        const py = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(1500px) rotateX(${py * -.55}deg) rotateY(${px * .55}deg) translateY(-1px)`;
      });
    });
    card.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * .035}px, ${y * .035}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

document.getElementById('year').textContent = String(new Date().getFullYear());
