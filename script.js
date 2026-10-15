const panelBody = document.getElementById('panelBody');

// API Endpoints
const COMMENTS_API = "https://api.studyspark.study/api/comments/6a36be5222cc4e987a2374ad?isPinned=true";
const SLIDES_API = "https://api.studyaura.online/api/penpencil/v1/batches/698ad3519549b300a5e1cc6a/subject/maths-by-sachin-jakhar-sir-095452/schedule/6a36be5222cc4e987a2374ad/slides";

// 1. Comments Render Function (Matching Screenshot UI)
async function loadComments() {
    panelBody.innerHTML = `<div class="text-xs text-zinc-500">Loading Comments...</div>`;
    try {
        const res = await fetch(COMMENTS_API);
        const data = await res.json();
        
        if (data.success && data.data) {
            panelBody.innerHTML = data.data.map(item => `
                <div class="bg-[#12131c] p-3 rounded-xl border border-zinc-800/60 flex items-start space-x-3">
                    <div class="w-7 h-7 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-semibold text-xs">
                        ${(item.createdBy?.name || 'S')[0]}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-zinc-200">${item.createdBy?.name || 'Student'}</span>
                            <span class="text-[10px] text-zinc-500">${new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p class="text-xs text-zinc-300 mt-1">${item.text}</p>
                        <div class="flex items-center space-x-1 mt-2 text-zinc-500 text-[11px]">
                            <span>👍</span> <span>${item.upvoteCount || 0}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (err) {
        panelBody.innerHTML = `<div class="text-xs text-red-400">Error loading comments.</div>`;
    }
}

// 2. Ask AI View Render Function
function loadAskAI() {
    panelBody.innerHTML = `
        <div class="flex flex-col h-full justify-between">
            <div class="bg-[#12131c] p-4 rounded-xl border border-zinc-800/60">
                <div class="flex items-center space-x-2 mb-2">
                    <span class="text-lg">🤖</span>
                    <span class="text-xs font-semibold text-zinc-200">StudyAura AI Bot</span>
                </div>
                <p class="text-xs text-zinc-400 leading-relaxed">
                    Welcome To StudyAura Website, I am here to help you. Ask me a doubt about this lecture to get started.
                </p>
            </div>
            
            <div class="mt-4 flex items-center gap-2">
                <input type="text" placeholder="Type your doubt..." class="flex-1 bg-[#12131c] border border-zinc-800 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500">
                <button class="bg-blue-600 text-white p-3 rounded-xl text-xs font-semibold">Send</button>
            </div>
        </div>
    `;
}

// 3. Tab Switching Core Logic
function switchTab(tab) {
    document.querySelectorAll('#panelTabs button').forEach(btn => btn.classList.remove('active-tab'));
    
    const activeBtn = document.getElementById(`tab-${tab}`);
    if (activeBtn) activeBtn.classList.add('active-tab');

    if (tab === 'comments') loadComments();
    else if (tab === 'ai') loadAskAI();
    else {
        panelBody.innerHTML = `<div class="text-xs text-zinc-400 p-2">Content for ${tab} tab loading from API...</div>`;
    }
}

// Initial Default Tab
switchTab('comments');
