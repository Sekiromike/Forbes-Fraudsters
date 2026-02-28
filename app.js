/* ─────────────────────────────────────────────
   app.js — The Engine of Despair

   I built this on a Saturday. A Saturday I will never get back.
   It is a fully interactive dashboard for browsing the resumes of
   people who Forbes called "visionaries" and the DOJ called
   "defendants." Both were correct. That's what makes it so sad.

   Architecture:
   - tabs.js (conceptually)  : lets you switch between flavors of awful
   - filters               : so you can find YOUR favorite fraudster
   - cards / table         : two ways to contemplate societal collapse
   - modal                  : for when you need the full case file
   - charts                 : because apparently we needed PRETTY GRAPHS
                              to make this real. a $63B number wasn't enough.

   Note to future self: if you are maintaining this dashboard
   it means more people are on it. I'm sorry.
───────────────────────────────────────────── */

/* ── HELPERS ──
   These are just utility functions. They don't know what they're
   being used for. They are innocent. Unlike the subjects of this database. */
const $ = id => document.getElementById(id);
const $$ = sel => [...document.querySelectorAll(sel)];

function formatMoney(n) {
  // If only these numbers were as easy to generate legitimately
  // as they apparently were to steal.
  if (!n || n === 0) return "Non-monetary (somehow worse)";
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3)  return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function getInitials(name) {
  return name.split(' ').slice(-2).map(w => w[0]).join('').toUpperCase();
}

function getStatusClass(s) {
  if (!s) return 'alleged';
  const l = s.toLowerCase();
  if (l.includes('convicted'))   return 'convicted';
  if (l.includes('pardoned'))    return 'pardoned';
  if (l.includes('indicted'))    return 'indicted';
  if (l.includes('charged'))     return 'charged';
  if (l.includes('investigation'))return 'under-investigation';
  if (l.includes('alleged'))     return 'alleged';
  if (l.includes('fined'))       return 'fined';
  if (l.includes('resigned'))    return 'resigned';
  return 'alleged';
}

function getRegionClass(r) {
  return 'region-' + (r || 'usa').toLowerCase().replace(/\s/g, '-');
}

/* ── STATE ──
   The app's mutable state. Not unlike the moral state of our protagonists:
   starts clean, gets messy fast, hard to audit. */
let activeTab     = 'dashboard';
let activeFilter  = 'all';
let activeRegion  = 'all';
let sortKey       = 'fraudAmount';
let sortAsc       = false;
let searchQuery   = '';
let activeView    = 'grid'; // 'grid' | 'table'

/* ── TAB NAVIGATION ──
   Switching between five different ways to confront the same information. */
function initTabs() {
  $$('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      $$('.nav-tab').forEach(b => b.classList.remove('active'));
      $$('.section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      $(tab).classList.add('active');
      activeTab = tab;
    });
  });
}

/* ── FILTERS ──
   Because sometimes you want to sort by "definitely did it"
   vs. "probably did it but lawyers are expensive." */
function initFilters() {
  $$('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderCards();
      renderTable();
    });
  });

  $$('.filter-btn[data-region]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn[data-region]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeRegion = btn.dataset.region;
      renderCards();
      renderTable();
    });
  });

  $('search-input').addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    renderCards();
    renderTable();
  });
}

/* ── FILTER LOGIC ──
   The saddest function this codebase. It filters a list of award winners
   by how badly they ended up. This is a real thing we built. */
function getFiltered() {
  return FRAUDSTERS.filter(f => {
    // status filter
    if (activeFilter !== 'all') {
      const sc = getStatusClass(f.legalStatus);
      if (activeFilter === 'convicted' && sc !== 'convicted' && sc !== 'pardoned') return false;
      if (activeFilter === 'indicted'  && sc !== 'indicted' && sc !== 'charged')   return false;
      if (activeFilter === 'alleged'   && sc !== 'alleged' && sc !== 'resigned' && sc !== 'under-investigation' && sc !== 'fined') return false;
    }
    // region filter
    if (activeRegion !== 'all' && f.region.toLowerCase() !== activeRegion.toLowerCase()) return false;
    // search
    if (searchQuery) {
      const haystack = [
        f.name, f.alias, f.company, f.category,
        f.description, ...(f.fraudType || []),
        ...(f.tags || [])
      ].filter(Boolean).join(' ').toLowerCase();
      if (!haystack.includes(searchQuery)) return false;
    }
    return true;
  });
}

function getSorted(list) {
  return [...list].sort((a, b) => {
    let av = a[sortKey], bv = b[sortKey];
    if (typeof av === 'string') av = av.toLowerCase();
    if (typeof bv === 'string') bv = bv.toLowerCase();
    if (av < bv) return sortAsc ? -1 : 1;
    if (av > bv) return sortAsc ? 1 : -1;
    return 0;
  });
}

/* ── CARDS ──
   Each card = one person = one Forbes accolade = one disaster.
   The notoriety bar at the bottom is extremely scientific. */
function renderCards() {
  const container = $('cards-container');
  const filtered  = getSorted(getFiltered());
  const count     = $('results-count');
  count.innerHTML = `Showing <strong>${filtered.length}</strong> of ${FRAUDSTERS.length} individuals`;

  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h3>Nobody here matches that search.</h3>
        <p>Either they were acquitted, they're using an alias, or they genuinely built a real business.<br/>
        <em>(That last one is statistically improbable given the dataset, but we remain open to it.)</em></p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(f => cardHTML(f)).join('');
  container.querySelectorAll('.fraudster-card').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.id));
  });
}

function cardHTML(f) {
  const sc      = getStatusClass(f.legalStatus);
  const initials = getInitials(f.name);
  const amtClass = f.fraudAmount > 0 ? (f.fraudAmount >= 1e9 ? '' : 'amber') : 'zero';
  const notW     = (f.notoriety / 10 * 100).toFixed(0);
  return `
    <div class="fraudster-card" data-id="${f.id}">
      <div class="card-header">
        <div class="card-avatar">${initials}</div>
        <div class="card-meta">
          <div class="card-name">${f.name}</div>
          ${f.alias ? `<div class="card-alias">"${f.alias}"</div>` : ''}
          <div class="card-company">${f.company}</div>
        </div>
        <div class="card-status">
          <span class="status-badge status-${sc}">${f.legalStatus.split('(')[0].trim()}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-row">
          <span class="card-row-label">Fraud Amount</span>
          <span class="card-amount ${amtClass}">${formatMoney(f.fraudAmount)}</span>
        </div>
        <div class="card-row">
          <span class="card-row-label">Forbes Year</span>
          <span class="card-row-value">${f.year} · ${f.category}</span>
        </div>
        <div class="card-row">
          <span class="card-row-label">Region</span>
          <span class="status-badge ${getRegionClass(f.region)}">${f.region}</span>
        </div>
        <div class="card-row">
          <span class="card-row-label">Sentence</span>
          <span class="card-row-value">${f.sentence}</span>
        </div>
        <p class="card-desc">${f.description}</p>
      </div>
      <div class="card-tags">
        ${f.fraudType.slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="notoriety-bar">
        <span>Notoriety</span>
        <div class="notoriety-track">
          <div class="notoriety-fill" style="width:${notW}%"></div>
        </div>
        <span>${f.notoriety}/10</span>
      </div>
    </div>`;
}

/* ── TABLE ──
   For the spreadsheet-brained among us. Sortable by everything
   including fraud amount, which is a sentence I cannot believe I typed. */
let currentSort = { key: 'fraudAmount', asc: false };

function renderTable() {
  const tbody   = $('table-body');
  const filtered = getSorted(getFiltered());

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">No matches. Either your filters are too strict or this person has successfully evaded accountability. Both are plausible.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(f => {
    const sc = getStatusClass(f.legalStatus);
    return `
      <tr data-id="${f.id}">
        <td class="name-cell">${f.name}${f.alias ? `<div style="font-size:11px;color:var(--amber);font-style:italic">"${f.alias}"</div>` : ''}</td>
        <td>${f.year}</td>
        <td>${f.category}</td>
        <td><span class="status-badge ${getRegionClass(f.region)}">${f.region}</span></td>
        <td class="amt ${f.fraudAmount === 0 ? 'zero' : ''}">${formatMoney(f.fraudAmount)}</td>
        <td><span class="status-badge status-${sc}">${f.legalStatus.split('(')[0].trim()}</span></td>
        <td>${f.sentence}</td>
      </tr>`;
  }).join('');

  tbody.querySelectorAll('tr').forEach(row => {
    row.addEventListener('click', () => openModal(+row.dataset.id));
  });
}

function initTable() {
  $$('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (sortKey === key) sortAsc = !sortAsc;
      else { sortKey = key; sortAsc = false; }
      $$('th[data-sort]').forEach(t => {
        t.classList.remove('sorted');
        t.querySelector('.sort-icon').textContent = '↕';
      });
      th.classList.add('sorted');
      th.querySelector('.sort-icon').textContent = sortAsc ? '↑' : '↓';
      renderCards();
      renderTable();
    });
  });
}

/* ── VIEW TOGGLE ──
   Grid view: cards. Table view: rows. Both views: despair. */
function initViewToggle() {
  $$('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeView = btn.dataset.view;
      if (activeView === 'grid') {
        $('cards-container').style.display = 'grid';
        $('table-wrap').style.display = 'none';
      } else {
        $('cards-container').style.display = 'none';
        $('table-wrap').style.display = 'block';
      }
    });
  });
}

/* ── MODAL ──
   Opens when a card is clicked, showing the full dossier.
   Closes with 'Escape' key, a button click, or an overwhelming
   sense of institutional dread — whichever comes first. */
function openModal(id) {
  const f = FRAUDSTERS.find(x => x.id === id);
  if (!f) return;

  const overlay   = $('modal-overlay');
  const sc        = getStatusClass(f.legalStatus);

  overlay.querySelector('.modal-avatar').textContent     = getInitials(f.name);
  overlay.querySelector('.modal-name').textContent       = f.name;
  overlay.querySelector('.modal-alias').textContent      = f.alias ? `"${f.alias}"` : '';
  overlay.querySelector('.modal-alias').style.display    = f.alias ? 'block' : 'none';
  overlay.querySelector('.modal-company').textContent    = f.company;

  const grid = overlay.querySelector('.modal-grid');
  grid.innerHTML = `
    <div class="modal-stat">
      <div class="modal-stat-label">Forbes Honored Them In</div>
      <div class="modal-stat-value">${f.year} <span style="color:var(--text-muted);font-size:11px">(lol)</span></div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">Industry They "Disrupted"</div>
      <div class="modal-stat-value">${f.category}</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">Operating Region</div>
      <div class="modal-stat-value"><span class="status-badge ${getRegionClass(f.region)}">${f.region}</span></div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">Current Situation</div>
      <div class="modal-stat-value"><span class="status-badge status-${sc}">${f.legalStatus}</span></div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">Approximate Damage ($)</div>
      <div class="modal-stat-value red">${formatMoney(f.fraudAmount)}</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">Time Awarded to Reflection</div>
      <div class="modal-stat-value amber">${f.sentence}</div>
    </div>
  `;

  overlay.querySelector('.modal-desc').textContent = f.description;
  overlay.querySelector('.modal-outcome').textContent = f.outcome;

  const tagsEl = overlay.querySelector('.modal-tags');
  tagsEl.innerHTML = f.fraudType.map(t => `<span class="tag">${t}</span>`).join('') +
    f.tags.map(t => `<span class="tag" style="opacity:0.6">#${t}</span>`).join('');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function initModal() {
  const overlay = $('modal-overlay');
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function closeModal() {
  $('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── CHARTS (Chart.js) ──
   Five charts. Five different geometric representations of the
   same fundamental question: "how did we let this happen."
   Chart.js is a great library. It deserves better than this use case. */
const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#9898b0', font: { size: 11 }, boxWidth: 12 }
    },
    tooltip: {
      backgroundColor: '#16161e',
      borderColor: 'rgba(220,38,38,0.3)',
      borderWidth: 1,
      titleColor: '#e8e8f0',
      bodyColor: '#9898b0',
      padding: 10,
    }
  }
};

function buildCharts() {
  Chart.defaults.color         = '#9898b0';
  Chart.defaults.borderColor   = 'rgba(255,255,255,0.06)';

  // Chart 1: Fraud by Sector
  // Spoiler: Finance leads. "Disruptive Finance" specifically.
  // Which is a phrase that turns out to have multiple meanings.
  const sectorAmounts = {};
  FRAUDSTERS.forEach(f => {
    const cat = f.category.split('/')[0].split('(')[0].trim();
    sectorAmounts[cat] = (sectorAmounts[cat] || 0) + f.fraudAmount;
  });
  const sectorSorted = Object.entries(sectorAmounts)
    .sort((a,b) => b[1]-a[1])
    .slice(0, 10);

  new Chart($('chart-sector'), {
    type: 'bar',
    data: {
      labels: sectorSorted.map(([k]) => k),
      datasets: [{
        label: 'Total Fraud ($)',
        data: sectorSorted.map(([,v]) => v),
        backgroundColor: [
          '#dc2626','#ef4444','#f87171','#fca5a5',
          '#f59e0b','#fbbf24','#fcd34d','#fde68a',
          '#8b5cf6','#a78bfa'
        ],
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        x: { ticks: { color: '#5a5a72', font: { size: 10 }, maxRotation: 35 } },
        y: {
          ticks: {
            color: '#5a5a72',
            callback: v => formatMoney(v)
          }
        }
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: { label: ctx => ` ${formatMoney(ctx.raw)}` }
        }
      }
    }
  });

  // Chart 2: Status Breakdown (Doughnut)
  // A doughnut chart of criminal outcomes. The center hole represents
  // the accountability gap.
  const statusCounts = {};
  FRAUDSTERS.forEach(f => {
    const sc = getStatusClass(f.legalStatus);
    statusCounts[sc] = (statusCounts[sc] || 0) + 1;
  });
  new Chart($('chart-status'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusCounts).map(k => k.charAt(0).toUpperCase() + k.slice(1).replace('-', ' ')),
      datasets: [{
        data: Object.values(statusCounts),
        backgroundColor: ['#dc2626','#f59e0b','#8b5cf6','#3b82f6','#16a34a','#64748b','#10b981'],
        borderColor: '#16161e',
        borderWidth: 3,
        hoverOffset: 6,
      }]
    },
    options: {
      ...CHART_DEFAULTS,
      cutout: '65%',
      plugins: {
        ...CHART_DEFAULTS.plugins,
        legend: { position: 'right', labels: { ...CHART_DEFAULTS.plugins.legend.labels } }
      }
    }
  });

  // Chart 3: Region Breakdown (Polar)
  // Turns out the Forbes-to-fraud pipeline is a global product.
  // International entrepreneurship!
  const regionCounts = {};
  FRAUDSTERS.forEach(f => { regionCounts[f.region] = (regionCounts[f.region] || 0) + 1; });
  new Chart($('chart-region'), {
    type: 'polarArea',
    data: {
      labels: Object.keys(regionCounts),
      datasets: [{
        data: Object.values(regionCounts),
        backgroundColor: [
          'rgba(59,130,246,0.5)','rgba(139,92,246,0.5)',
          'rgba(245,158,11,0.5)','rgba(16,185,129,0.5)',
          'rgba(244,63,94,0.5)'
        ],
        borderColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
      }]
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        r: {
          ticks: { color: '#5a5a72', font: { size: 10 }, backdropColor: 'transparent' },
          grid:  { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });

  // Chart 4: Timeline (Bar + Line combo)
  // The amber line shows how many honorees per year later became cases.
  // The red bars show how much money was involved.
  // The absence of joy is implied.
  const yearAmounts = {};
  const yearCounts  = {};
  FRAUDSTERS.forEach(f => {
    yearAmounts[f.year] = (yearAmounts[f.year] || 0) + f.fraudAmount;
    yearCounts[f.year]  = (yearCounts[f.year]  || 0) + 1;
  });
  const years = Object.keys(yearAmounts).sort();
  new Chart($('chart-timeline'), {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          type: 'line',
          label: 'Honorees on List',
          data: years.map(y => yearCounts[y] || 0),
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245,158,11,0.08)',
          pointBackgroundColor: '#f59e0b',
          pointRadius: 4,
          tension: 0.4,
          yAxisID: 'y2',
          fill: true,
        },
        {
          label: 'Total Fraud Amount ($)',
          data: years.map(y => yearAmounts[y] || 0),
          backgroundColor: 'rgba(220,38,38,0.6)',
          borderColor: 'rgba(220,38,38,0.9)',
          borderRadius: 3,
          yAxisID: 'y1',
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        x: { ticks: { color: '#5a5a72', font: { size: 10 } } },
        y1: {
          position: 'left',
          ticks: { color: '#5a5a72', callback: v => formatMoney(v) }
        },
        y2: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#f59e0b', font: { size: 10 } }
        }
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: ctx =>
              ctx.datasetIndex === 0
                ? ` ${ctx.raw} honorees`
                : ` ${formatMoney(ctx.raw)}`
          }
        }
      }
    }
  });

  // Chart 5: Top 10 Biggest Frauds (Horizontal Bar)
  // A leaderboard nobody asked to be on.
  // (Except possibly the people on it, in hindsight.)
  const top10 = [...FRAUDSTERS]
    .filter(f => f.fraudAmount > 0)
    .sort((a,b) => b.fraudAmount - a.fraudAmount)
    .slice(0, 10);

  new Chart($('chart-top10'), {
    type: 'bar',
    data: {
      labels: top10.map(f => f.name.split(' ').pop()),
      datasets: [{
        label: 'Fraud Amount',
        data: top10.map(f => f.fraudAmount),
        backgroundColor: top10.map((_, i) => `hsl(${0 + i*8},${80-i*4}%,${50-i*2}%)`),
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      ...CHART_DEFAULTS,
      indexAxis: 'y',
      scales: {
        x: {
          ticks: { color: '#5a5a72', callback: v => formatMoney(v) }
        },
        y: { ticks: { color: '#9898b0', font: { size: 11 } } }
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: ctx => ` ${formatMoney(ctx.raw)}`,
            title: ctxArr => top10[ctxArr[0].dataIndex].name
          }
        }
      }
    }
  });
}

/* ── TIMELINE RENDER ──
   Renders a chronological record of events that, taken together,
   form what historians would call "a pattern" and what Forbes
   calls "a small number of isolated incidents." */
function renderTimeline() {
  const container = $('timeline-container');
  let html = '';
  let lastYear = null;

  TIMELINE_EVENTS.forEach(ev => {
    if (ev.year !== lastYear) {
      html += `<div style="font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--red-light);margin:${lastYear ? '28px' : '0'} 0 8px;letter-spacing:0.12em">${ev.year}</div>`;
      lastYear = ev.year;
    }
    html += `
      <div class="timeline-item type-${ev.type}">
        <div class="timeline-dot"></div>
        <div class="timeline-content">${ev.event}</div>
      </div>`;
  });
  container.innerHTML = html;
}

/* ── KPI COUNTERS ──
   Animates the big scary numbers so they feel like an achievement
   instead of an indictment of the entire venture capital ecosystem.
   The animation does not make the numbers smaller. We tried. */
function animateCounters() {
  const counters = [
    { id: 'kpi-total-fraud',   target: 63.4,  suffix: 'B+',  prefix: '$' },
    { id: 'kpi-convicted',     target: 16,    suffix: '',    prefix: ''  },
    { id: 'kpi-individuals',   target: 27,    suffix: '+',   prefix: ''  },
    { id: 'kpi-avg-sentence',  target: 7.2,   suffix: ' yrs',prefix: ''  },
  ];
  counters.forEach(({ id, target, suffix, prefix }) => {
    const el = $(id);
    if (!el) return;
    const isDecimal = target % 1 !== 0;
    let start = 0;
    const step = target / 50;
    const interval = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = prefix + (isDecimal ? start.toFixed(1) : Math.floor(start)) + suffix;
      if (start >= target) clearInterval(interval);
    }, 30);
  });
}

/* ── INIT ──
   Boots everything. Like the founders did with their businesses:
   with great confidence and extremely limited accountability. */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initFilters();
  initTable();
  initViewToggle();
  initModal();
  renderCards();
  renderTable();
  renderTimeline();
  buildCharts();
  animateCounters();
});
