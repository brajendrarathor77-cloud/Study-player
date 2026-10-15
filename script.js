const videoElement = document.getElementById('mainVideo');
const panelContent = document.getElementById('panelContent');
const panelTitle = document.getElementById('panelTitle');

// 1. Load Video Stream Link
const videoApiUrl = "https://api.studyspark.study/api/video-link";
// Aap direct CDN link bhi use kar sakte hain jo aapne diya hai:
const directVideoUrl = "https://spark-url3.b-cdn.net/2230eb0c-8059-4c6a-ad7b-dbb958ee00f4/mp4/2230eb0c-8059-4c6a-ad7b-dbb958ee00f4_720p.mp4";

videoElement.src = directVideoUrl;

// 2. Fetch Comments API
function loadComments() {
    panelTitle.innerText = "Comments";
    panelContent.innerHTML = "<p class='text-xs text-zinc-400'>Loading comments...</p>";

    fetch("https://api.studyspark.study/api/comments/6a36be5222cc4e987a2374ad?isPinned=true")
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data) {
                panelContent.innerHTML = "";
                data.data.forEach(item => {
                    panelContent.innerHTML += `
                        <div class="bg-[#12131c] p-3 rounded-xl border border-zinc-800/60">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs font-semibold text-zinc-300">${item.createdBy?.name || 'Student'}</span>
                                <span class="text-[10px] text-zinc-500">Likes: ${item.upvoteCount || 0}</span>
                            </div>
                            <p class="text-xs text-zinc-400">${item.text}</p>
                        </div>
                    `;
                });
            }
        })
        .catch(err => {
            panelContent.innerHTML = "<p class='text-xs text-red-400'>Failed to load comments.</p>";
        });
}

// Tab Switching Logic
function openTab(tabName) {
    if (tabName === 'comments') {
        loadComments();
    } else if (tabName === 'ai') {
        panelTitle.innerText = "Ask AI Assistant";
        panelContent.innerHTML = `
            <div class="bg-[#12131c] p-3 rounded-xl border border-zinc-800">
                <p class="text-xs text-zinc-300 mb-2">Welcome To StudyAura, ask me a doubt about this lecture.</p>
                <input type="text" placeholder="Type your doubt..." class="w-full bg-black/40 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white outline-none">
            </div>
        `;
    } else {
        panelTitle.innerText = tabName.toUpperCase();
        panelContent.innerHTML = `<p class='text-xs text-zinc-400'>Content for ${tabName} will appear here using respective APIs.</p>`;
    }
}

// Initial load par comments dikhayein
loadComments();
