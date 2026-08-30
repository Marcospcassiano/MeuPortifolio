// =============================================================
// FOOTER YEAR
// =============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =============================================================
// NAVBAR: scroll state + mobile toggle
// =============================================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function setScrolledState(){
  navbar.classList.toggle('is-scrolled', window.scrollY > 12);
}
setScrolledState();
window.addEventListener('scroll', setScrolledState, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =============================================================
// SCROLL PROGRESS BAR
// =============================================================
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// =============================================================
// SCROLLSPY — highlight active nav link
// =============================================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.navbar__link[data-nav]');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

sections.forEach(section => spyObserver.observe(section));

// =============================================================
// REVEAL ON SCROLL
// =============================================================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
  revealObserver.observe(el);
});

// =============================================================
// BACK TO TOP
// =============================================================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================================================
// HERO — typed code effect
// =============================================================
const codeLines = [
  'public class Desenvolvedor',
  '{',
  '    public string Nome =>',
  '        "Marcos Paulo Cassiano";',
  '',
  '    public string Cargo =>',
  '        "Desenvolvedor de Software";',
  '',
  '    public string[] Foco => new[]',
  '    {',
  '        "C#", ".NET", "SQL Server",',
  '        "Desenvolvimento Web"',
  '    };',
  '',
  '    public bool DisponivelPara =>',
  '        Estagio || PrimeiroEmprego;',
  '}'
];

const typedCodeEl = document.getElementById('typedCode');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeCode(){
  if (prefersReducedMotion){
    typedCodeEl.textContent = codeLines.join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let output = '';

  function step(){
    if (lineIndex >= codeLines.length){
      typedCodeEl.innerHTML = output + '<span class="cursor-blink">▍</span>';
      return;
    }
    const currentLine = codeLines[lineIndex];

    if (charIndex <= currentLine.length){
      typedCodeEl.textContent = output + currentLine.slice(0, charIndex);
      charIndex++;
      setTimeout(step, 14);
    } else {
      output += currentLine + '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(step, 45);
    }
  }
  step();
}

// Trigger typing once hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      typeCode();
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

heroObserver.observe(document.getElementById('home'));

// =============================================================
// CONTACT FORM (front-end only — no backend wired up)
// =============================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message){
    formStatus.textContent = 'Preencha todos os campos antes de enviar.';
    formStatus.style.color = '#ef5f57';
    return;
  }

  // TODO: conectar a um serviço real de envio (ex: Formspree, EmailJS, backend próprio)
  formStatus.textContent = `Obrigado, ${name}! Sua mensagem foi registrada localmente — conecte este formulário a um serviço de envio para recebê-la por e-mail.`;
  formStatus.style.color = '';
  contactForm.reset();
});
