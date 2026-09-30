(function () {
  const $ = (id) => document.getElementById(id);

  const btn = $('menuBtn'), menu = $('mobileMenu');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    btn.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('.svc').forEach((c) => c.addEventListener('click', () => {
    const more = c.querySelector('.more');
    const hidden = more.classList.toggle('hidden');
    c.setAttribute('aria-expanded', String(!hidden));
  }));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  function calc() {
    const r = +$('reports').value, h = +$('hours').value, c = +$('cost').value, f = +$('vol').value;
    $('reportsV').textContent = r; $('hoursV').textContent = h; $('costV').textContent = c;
    const saved = r * h * f;
    $('outH').textContent = saved.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' h';
    $('outM').textContent = fmt(saved * c);
    $('outY').textContent = fmt(saved * c * 12);
    const pct = Math.round(f * 100);
    $('outP').textContent = pct + '%';
    $('bar').style.width = pct + '%';
    const msg = `Olá! Simulei o ROI no site: economia estimada de ${fmt(saved * c)}/mês (${Math.round(saved)} h). Gostaria de um diagnóstico.`;
    $('roiCta').href = 'https://wa.me/5521966606909?text=' + encodeURIComponent(msg);
  }
  ['reports', 'hours', 'cost', 'vol'].forEach((id) => $(id).addEventListener('input', calc));
  calc();

  $('year').textContent = new Date().getFullYear();
})();
