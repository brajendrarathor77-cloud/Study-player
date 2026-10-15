const vid = document.getElementById('vid');
const overlay = document.getElementById('ctrl-overlay');
const midIPlay = document.getElementById('midIPlay');
const midIPause = document.getElementById('midIPause');
const midPlayBtn = document.getElementById('midPlayBtn');
const seekBar = document.getElementById('seekBar');
const barFill = document.getElementById('barFill');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');
const clBtn = document.getElementById('clBtn');
const askAiIcon = document.getElementById('askAiIcon');
const commentsView = document.getElementById('commentsView');
const aiView = document.getElementById('aiView');
const panelTitle = document.getElementById('panelTitle');

// Auto Hide Overlay Controls Logic
let hideTimer;
function showControls() {
  overlay.classList.remove('hidden');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    if (!vid.paused) overlay.classList.add('hidden');
  }, 3500);
}

document.getElementById('vid-box').addEventListener('mousemove', showControls);

// Play / Pause Logic
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

// Time Formatter
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Progress Bar Updates
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

// Seeking
seekBar.addEventListener('input', () => {
  const time = (seekBar.value / 1000) * vid.duration;
  vid.currentTime = time;
});

// Panel Switching (Comments <-> Ask AI)
clBtn.addEventListener('click', () => {
  commentsView.style.display = 'block';
  aiView.style.display = 'none';
  panelTitle.textContent = 'Comments';
});

askAiIcon.addEventListener('click', () => {
  commentsView.style.display = 'none';
  aiView.style.display = 'block';
  panelTitle.textContent = 'Ask AI';
});
