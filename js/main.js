const cases = {
    shell: { title: 'Shell - Otimização Operacional e Redução de Custos', category: 'Energia & Indústria', icon: 'fa-dharmachakra', description: 'Desenvolvimento de rotinas analíticas avançadas em Python e Spotfire para mapear ocorrências, identificar anomalias operacionais e eliminar desperdícios financeiros em grande escala.', highlights: ['Mapeamento de anomalias', 'Redução de desperdícios', 'Análises preditivas'], metric1: 'R$ 1.2M economizados', metric2: '99.4% acurácia' },
    iesbrazil: { title: 'IesBrazil - Eliminação de Gargalos & Eficiência', category: 'Tecnologia & Inovação', icon: 'fa-droplet', description: 'Mapeamento dos fluxos de dados do processo produtivo e criação de pipelines automáticos, reduzindo travamentos no fluxo de trabalho.', highlights: ['Mapeamento de gargalos', 'Automação ETL', 'Aumento do output'], metric1: '+45% produtividade', metric2: '-60% gargalos' },
    itacoatiara: { title: 'Itacoatiara Pampo Clube - Inteligência de Gestão', category: 'Gestão Esportiva & Lazer', icon: 'fa-umbrella-beach', description: 'Estruturação de dashboards gerenciais para controle do quadro associativo, fluxo operacional e planejamento orçamentário do clube.', highlights: ['Dashboards Spotfire', 'Gestão de associados', 'Planejamento estratégico'], metric1: '100% digitalizado', metric2: 'Decisão 3x mais rápida' },
    uba: { title: 'Condomínio UBA - Planejamento do Futuro', category: 'Gestão Imobiliária', icon: 'fa-building-user', description: 'Transformação da gestão financeira e operacional através de indicadores em tempo real, prevendo contingências e otimizando recursos.', highlights: ['Previsão orçamentária', 'Gestão transparente', 'Redução de custos fixos'], metric1: '-22% custos fixos', metric2: 'Zero atrasos' }
};
const caseKeys = Object.keys(cases);
let currentCase = 0;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function renderCase(index) {
    currentCase = (index + caseKeys.length) % caseKeys.length;
    const key = caseKeys[currentCase];
    const item = cases[key];
    $('#case-title').textContent = item.title;
    $('#case-category').textContent = item.category;
    $('#case-description').textContent = item.description;
    $('#case-metric-1').textContent = item.metric1;
    $('#case-metric-2').textContent = item.metric2;
    $('#case-highlights').innerHTML = item.highlights.map((highlight) => `<span>${highlight}</span>`).join('');
    $$('.client').forEach((client) => client.classList.toggle('active', client.dataset.case === key));
}

function calculateROI() {
    const team = Number($('#input-team-size').value);
    const hours = Number($('#input-hours').value);
    const cost = Number($('#input-cost').value);
    const savedHours = Math.round(team * hours * 52 * 0.8);
    $('#val-team-size').textContent = `${team} ${team === 1 ? 'pessoa' : 'pessoas'}`;
    $('#val-hours').textContent = `${hours} horas`;
    $('#val-cost').textContent = `R$ ${cost} /h`;
    $('#output-annual-savings').textContent = `R$ ${(savedHours * cost).toLocaleString('pt-BR')}`;
    $('#output-hours-saved').textContent = `${savedHours.toLocaleString('pt-BR')} hrs`;
}

function setupChart() {
    const chart = new Chart($('#heroLiveChart'), { type: 'line', data: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'], datasets: [{ data: [45, 52, 58, 65, 78, 88, 96], borderColor: '#00d2df', backgroundColor: 'rgba(0,210,223,.1)', fill: true, tension: .4, borderWidth: 2, pointBackgroundColor: '#0072ff', pointRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#64748b', font: { size: 10 } } }, y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#64748b', font: { size: 10 } } } } } });
    $('#chart-update').addEventListener('click', () => { chart.data.datasets[0].data = chart.data.datasets[0].data.map((value) => Math.min(100, Math.max(30, value + (Math.random() * 14 - 6)))); chart.update(); });
}

function setupModal() {
    const modal = $('#contact-modal');
    $$('[data-contact]').forEach((button) => button.addEventListener('click', () => modal.showModal()));
    $('.dialog-close').addEventListener('click', () => modal.close());
    modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });
}

function setupMobileMenu() {
    const button = $('#mobile-menu-btn');
    const menu = $('#mobile-menu');
    button.addEventListener('click', () => { const isOpen = menu.hidden; menu.hidden = !isOpen; button.setAttribute('aria-expanded', String(isOpen)); });
    $$('#mobile-menu a').forEach((link) => link.addEventListener('click', () => { menu.hidden = true; button.setAttribute('aria-expanded', 'false'); }));
}

function setupContactForm() {
    $('#contact-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const success = $('#form-success');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        try {
            const payload = new FormData(form);
            payload.set('form-name', 'contact');
            const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(payload).toString() });
            if (!response.ok) throw new Error('Form submission failed');
            form.reset();
            success.textContent = 'Solicitação recebida com sucesso. Retornaremos o contato em até 2 horas úteis.';
            success.hidden = false;
            window.setTimeout(() => { success.hidden = true; }, 5000);
        } catch (error) {
            success.textContent = 'Não foi possível enviar agora. Tente novamente ou use o WhatsApp.';
            success.hidden = false;
        } finally {
            submitButton.disabled = false;
        }
    });
}

function setupParticles() {
    const canvas = $('#particle-canvas');
    const context = canvas.getContext('2d');
    let particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; particles = Array.from({ length: 45 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, radius: Math.random() * 1.8 + 1 })); };
    const animate = () => { context.clearRect(0, 0, canvas.width, canvas.height); particles.forEach((particle, index) => { particle.x += particle.vx; particle.y += particle.vy; if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1; if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1; context.beginPath(); context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2); context.fillStyle = 'rgba(0,210,223,.4)'; context.fill(); particles.slice(index + 1).forEach((other) => { const distance = Math.hypot(particle.x - other.x, particle.y - other.y); if (distance < 120) { context.beginPath(); context.moveTo(particle.x, particle.y); context.lineTo(other.x, other.y); context.strokeStyle = `rgba(0,114,255,${.15 * (1 - distance / 120)})`; context.stroke(); } }); }); requestAnimationFrame(animate); };
    resize(); window.addEventListener('resize', resize); animate();
}

function initialize() {
    $('#client-grid').innerHTML = Object.entries(cases).map(([key, item]) => `<button class="client" data-case="${key}"><i class="fa-solid ${item.icon}"></i><b>${key === 'iesbrazil' ? 'IesBrazil' : key === 'itacoatiara' ? 'Itacoatiara Pampo Clube' : key === 'uba' ? 'Condomínio UBA' : 'Shell'}</b><small>${item.category}</small></button>`).join('');
    $$('.client').forEach((client) => client.addEventListener('click', () => renderCase(caseKeys.indexOf(client.dataset.case))));
    $('#case-prev').addEventListener('click', () => renderCase(currentCase - 1));
    $('#case-next').addEventListener('click', () => renderCase(currentCase + 1));
    $$('#calculadora input').forEach((input) => input.addEventListener('input', calculateROI));
    renderCase(0); calculateROI(); setupChart(); setupModal(); setupMobileMenu(); setupContactForm(); setupParticles();
}

document.addEventListener('DOMContentLoaded', initialize);
