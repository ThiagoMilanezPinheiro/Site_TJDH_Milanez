const cases = {
    shell: { title: 'Shell - Serviços de BI e Data Science', category: 'Consultoria em BI, Analytics & Data Science | abr. 2022 - jun. 2025 (3 anos e 3 meses)', logo: 'css/assets/logos/shell-logo-png.png', description: 'Consultoria e desenvolvimento em TIBCO Spotfire para projetos de Engenharia de Reservatórios. Criação de uma automação para padronizar relatórios e disponibilizar dados estruturados para consumo nos projetos, reduzindo de semanas para dias o tempo de tratamento e análise e diminuindo o risco de erros manuais. Desenvolvimento em R para soluções de Data Science, além de automações com Python e macros em Excel.', highlights: ['Consultoria e desenvolvimento TIBCO Spotfire', 'Soluções analíticas para Engenharia de Reservatórios', 'Automação de relatórios: de semanas para dias', 'Padronização de dados e redução de erros manuais', 'R para Data Science, Python e macros em Excel'], metricLabel1: 'Tempo de tratamento e análise', metric1: 'De semanas para dias', metricLabel2: 'Padronização e qualidade dos dados', metric2: 'Menos erros manuais' },
    iesbrazil: { title: 'IesBrazil - Eliminação de Gargalos & Eficiência', category: 'Tecnologia & Inovação', logo: 'css/assets/logos/IesBrazil.png', description: 'Mapeamento dos fluxos de dados do processo produtivo e criação de pipelines automáticos, reduzindo travamentos no fluxo de trabalho.', highlights: ['Mapeamento de gargalos', 'Automação ETL', 'Aumento do output'], metric1: '+45% produtividade', metric2: '-60% gargalos' },
    itacoatiara: { title: 'Itacoatiara Pampo Clube - Inteligência de Gestão', category: 'Gestão Esportiva & Lazer', logo: 'css/assets/logos/PampoCLube-00.png', description: 'Desenvolvimento de dashboards gerenciais em Power BI para consolidar informações do clube e agilizar a geração e a análise de relatórios. Com os painéis, foi possível identificar oportunidades para aumentar as receitas e reduzir despesas, tanto nas rotinas operacionais quanto nos processos de gestão, oferecendo mais visibilidade para o acompanhamento financeiro e apoiando decisões administrativas mais bem embasadas.', highlights: ['Dashboards gerenciais em Power BI', 'Geração e análise de relatórios com mais agilidade', 'Identificação de oportunidades para ampliar receitas', 'Otimização de despesas operacionais e administrativas'], metricLabel1: 'Análise e geração de relatórios', metric1: 'Mais agilidade com Power BI', metricLabel2: 'Oportunidades identificadas', metric2: 'Receitas e despesas do clube' },
    uba: { title: 'Condomínio UBA - Gestão Financeira e Acompanhamento', category: 'Gestão Imobiliária · Cliente atual', icon: 'fa-building-user', description: 'Atuação em andamento no acompanhamento das receitas e despesas do condomínio, organizando informações financeiras para dar mais visibilidade à gestão. O trabalho apoia o monitoramento do orçamento, a análise dos custos e a identificação de oportunidades de melhoria na operação e na administração.', highlights: ['Acompanhamento contínuo de receitas e despesas', 'Organização e análise de informações financeiras', 'Monitoramento do orçamento e dos custos', 'Apoio à gestão operacional e administrativa'], metricLabel1: 'Foco do projeto', metric1: 'Acompanhamento financeiro', metricLabel2: 'Status do cliente', metric2: 'Projeto em andamento' }
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
    const metricLabels = document.querySelectorAll('.case-metrics > span');
    metricLabels[0].firstChild.textContent = item.metricLabel1 || 'Indicador principal';
    metricLabels[1].firstChild.textContent = item.metricLabel2 || 'Eficiência gerencial';
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
    const form = $('#contact-form');
    form.setAttribute('name', 'contact');
    form.setAttribute('data-netlify', 'true');
    form.setAttribute('netlify-honeypot', 'bot-field');
    $('#contact-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const success = $('#form-success');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        try {
            const payload = new FormData(form);
            payload.set('form-name', 'contact');
            const response = await fetch(window.location.pathname, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(payload).toString() });
            if (!response.ok) throw new Error('Form submission failed');
            form.reset();
            success.textContent = 'Solicitação recebida com sucesso. Retornaremos o contato em até 2 dias úteis.';
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
    $('#client-grid').innerHTML = Object.entries(cases).map(([key, item]) => `<button class="client" data-case="${key}">${item.logo ? `<img class="client-logo${key === 'itacoatiara' ? ' client-logo-pampo' : ''}" src="${item.logo}" alt="Logo ${key === 'iesbrazil' ? 'IesBrazil' : key === 'itacoatiara' ? 'Itacoatiara Pampo Clube' : 'Shell'}">` : `<i class="fa-solid ${item.icon}"></i>`}<b>${key === 'iesbrazil' ? 'IesBrazil' : key === 'itacoatiara' ? 'Itacoatiara Pampo Clube' : key === 'uba' ? 'Condomínio UBA' : 'Shell'}</b><small>${item.category}</small></button>`).join('');
    $$('.client').forEach((client) => client.addEventListener('click', () => renderCase(caseKeys.indexOf(client.dataset.case))));
    $('#case-prev').addEventListener('click', () => renderCase(currentCase - 1));
    $('#case-next').addEventListener('click', () => renderCase(currentCase + 1));
    $$('#calculadora input').forEach((input) => input.addEventListener('input', calculateROI));
    renderCase(0); calculateROI(); setupChart(); setupModal(); setupMobileMenu(); setupContactForm(); setupParticles();
}

document.addEventListener('DOMContentLoaded', initialize);
