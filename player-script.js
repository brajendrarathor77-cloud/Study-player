const sidePanel = document.getElementById('side-panel');
const panelCloseBtn = document.getElementById('panelCloseBtn');

// Open/Close panel handler
clBtn.addEventListener('click', () => {
  sidePanel.classList.toggle('open');
  commentsView.style.display = 'block';
  aiView.style.display = 'none';
  panelTitle.textContent = 'Comments';
});

askAiIcon.addEventListener('click', () => {
  sidePanel.classList.toggle('open');
  commentsView.style.display = 'none';
  aiView.style.display = 'block';
  panelTitle.textContent = 'Ask AI';
});

panelCloseBtn.addEventListener('click', () => {
  sidePanel.classList.remove('open');
});
