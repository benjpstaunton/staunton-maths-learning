
/* Year in footer */
document.getElementById('year').textContent = new Date().getFullYear();

/* Accessible About dropdown */
const toggle = document.getElementById('about-toggle');
const menu = document.getElementById('about-menu');
if (toggle && menu){
  const openMenu = () => { menu.dataset.open = "true"; toggle.setAttribute('aria-expanded','true'); };
  const closeMenu = () => { delete menu.dataset.open; toggle.setAttribute('aria-expanded','false'); };
  const isOpen = () => menu.dataset.open === "true";

  toggle.addEventListener('click', (e)=>{ e.stopPropagation(); isOpen() ? closeMenu() : openMenu(); });
  document.addEventListener('click', (e)=>{ if (!menu.contains(e.target) && e.target !== toggle) closeMenu(); });

  toggle.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowDown'){ openMenu(); const first = menu.querySelector('a'); first && first.focus(); }
  });
  menu.addEventListener('keydown', (e)=>{
    const items = Array.from(menu.querySelectorAll('a'));
    const idx = items.indexOf(document.activeElement);
    if (e.key === 'Escape'){ closeMenu(); toggle.focus(); }
    if (e.key === 'ArrowDown'){ e.preventDefault(); (items[idx+1] || items[0]).focus(); }
    if (e.key === 'ArrowUp'){ e.preventDefault(); (items[idx-1] || items[items.length-1]).focus(); }
    if (e.key === 'Home'){ e.preventDefault(); items[0].focus(); }
    if (e.key === 'End'){ e.preventDefault(); items[items.length-1]).focus(); }
  });
}

/* IntersectionObserver reveal (respects prefers-reduced-motion) */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
}

/* Contact form validation (client-side) */
const form = document.getElementById('contact-form');
if (form){
  const status = document.getElementById('form-status');
  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    year: document.getElementById('year'),
    message: document.getElementById('message')
  };
  const errors = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    phone: document.getElementById('phone-error'),
    year: document.getElementById('year-error'),
    message: document.getElementById('message-error'),
  };

  const showError = (key, msg) => {
    errors[key].textContent = msg;
    errors[key].hidden = false;
    fields[key].setAttribute('aria-invalid', 'true');
  };
  const clearError = (key) => {
    errors[key].textContent = '';
    errors[key].hidden = true;
    fields[key].removeAttribute('aria-invalid');
  };

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    Object.keys(errors).forEach(clearError);
    status.hidden = true;
    status.textContent = '';

    let valid = true;

    if (!fields.name.value.trim()){
      showError('name','Please enter your name.');
      valid = false;
    }
    const emailVal = fields.email.value.trim();
    if (!emailVal){
      showError('email','Please enter your email.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)){
      showError('email','Please enter a valid email address.');
      valid = false;
    }
    if (!fields.year.value){
      showError('year','Please choose a year group.');
      valid = false;
    }
    if (!fields.message.value.trim()){
      showError('message','Please include a short message.');
      valid = false;
    }

    if (!valid) return;

    // Stub handler (replace or adapt for Netlify/Forms backend)
    status.hidden = false;
    status.textContent = 'Thanks — your message has been captured locally (demo). Please use the email button for now.';
    form.reset();
    fields.name.focus();
  });
}
