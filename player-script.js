const vid = document.getElementById('vid');
const overlay = document.getElementById('ctrl-overlay');
const midIPlay = document.getElementById('midIPlay');
const midIPause = document.getElementById('midIPause');
const midPlayBtn = document.getElementById('midPlayBtn');
const seekBar = document.getElementById('seekBar');
const barFill = document.getElementById('barFill');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');

const sidePanel = document.getElementById('side-panel');
const panelCloseBtn = document.getElementById('panelCloseBtn');
const panelTitle = document.getElementById('panelTitle');
const panelTabs = document.getElementById('panelTabs');

const tlBtn = document.getElementById('tlBtn');
const clBtn = document.getElementById('clBtn');
const askAiIcon = document.getElementById('askAiIcon');
const dlBtn = document.getElementById('dlBtn');

const timelineTab = document.getElementById('timelineTab');
const attachmentsTab = document.getElementById('attachmentsTab');
const lecturesTab = document.getElementById('lecturesTab');
const commentsTab = document.getElementById('commentsTab');
const aiTab = document.getElementById('aiTab');

// Auto hide controls
let hideTimer;
function showControls() {
  overlay.classList.remove('hidden');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    if (!vid.paused) overlay.classList.add('hidden');
  }, 3500);
}
document.getElementById('vid-box').addEventListener('mousemove', showControls);

// Play / Pause
function togglePlay() {
  if (vid.paused) {
    vid.play();
    midIPlay.style.display = 'none';
    midIPause.style.display = 'block';
  } else {
    vid.pause();
    midIPlay.style.display = 'block';
    midIPause.style.display = 'none';
  }
  showControls();
}
midPlayBtn.addEventListener('click', togglePlay);

// Time format
function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

vid.addEventListener('timeupdate', () => {
  if (vid.duration) {
    const pct = (vid.currentTime / vid.duration) * 100;
    barFill.style.width = pct + '%';
    seekBar.value = (vid.currentTime / vid.duration) * 1000;
    curTime.textContent = formatTime(vid.currentTime);
  }
});

vid.addEventListener('loadedmetadata', () => {
  durTime.textContent = formatTime(vid.duration);
});

seekBar.addEventListener('input', () => {
  vid.currentTime = (seekBar.value / 1000) * vid.duration;
});

// Switch Tabs Helper
function openPanel(title, activeTabId, showTabsHeader = true) {
  sidePanel.classList.add('open');
  panelTitle.textContent = title;
  panelTabs.style.display = showTabsHeader ? 'flex' : 'none';

  [timelineTab, attachmentsTab, lecturesTab, commentsTab, aiTab].forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(activeTabId).style.display = 'block';
}

// Button Events
tlBtn.addEventListener('click', () => {
  openPanel('Timeline', 'timelineTab', true);
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-target="timelineTab"]').classList.add('active');
});

clBtn.addEventListener('click', () => openPanel('Comments', 'commentsTab', false));
askAiIcon.addEventListener('click', () => openPanel('Ask AI', 'aiTab', false));
dlBtn.addEventListener('click', () => openPanel('Attachments', 'attachmentsTab', true));

panelCloseBtn.addEventListener('click', () => sidePanel.classList.remove('open'));

// Tab Switching inside Panel Header
document.querySelectorAll('.ptab').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');

    const targetId = e.target.getAttribute('data-target');
    [timelineTab, attachmentsTab, lecturesTab].forEach(tab => tab.style.display = 'none');
    document.getElementById(targetId).style.display = 'block';
  });
});

// Three dots menu toggle
const tdBtn = document.getElementById('tdBtn');
const tdMenu = document.getElementById('tdMenu');
tdBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  tdMenu.classList.toggle('on');
});
document.addEventListener('click', () => tdMenu.classList.remove('on'));
