const panelBody = document.getElementById('panelBody');
const CORS_PROXY = "https://corsproxy.io/?";

const API_ENDPOINTS = {
    slides: "https://api.studyaura.online/api/penpencil/v1/batches/698ad3519549b300a5e1cc6a/subject/maths-by-sachin-jakhar-sir-095452/schedule/6a36be5222cc4e987a2374ad/slides",
    scheduleDetails: "https://api.studyaura.online/api/penpencil/v1/batches/698ad3519549b300a5e1cc6a/subject/maths-by-sachin-jakhar-sir-095452/schedule/6a36be5222cc4e987a2374ad/schedule-details",
    moreLectures: "https://api.studyaura.online/api/penpencil/batch-service/v3/batch-subject-schedules/698ad3519549b300a5e1cc6a/subject/69b569e8cd9eea58b9fe60da/contents?skip=0&limit=30&contentType=LECTURES&tagId=69dc843271d06abbf386979f",
    comments: "https://api.studyspark.study/api/comments/6a36be5222cc4e987a2374ad?isPinned=true"
};

async function fetchSafeData(url) {
    try {
        const response = await fetch(CORS_PROXY + encodeURIComponent(url));
        if (!response.ok) throw new Error("Proxy error");
        return await response.json();
    } catch (e) {
        const rawResponse = await fetch(url);
        return await rawResponse.json();
    }
}

// 1. Comments
async function loadComments() {
    panelBody.innerHTML = `<div class="text-xs text-zinc-500 animate-pulse">Loading comments...</div>`;
    try {
        const data = await fetchSafeData(API_ENDPOINTS.comments);
        const commentList = data.data || data.comments || [];

        if (commentList.length > 0) {
            panelBody.innerHTML = commentList.map(item => `
                <div class="bg-[#12131c] p-2.5 rounded-xl border border-zinc-800/60 flex items-start space-x-2.5">
                    <div class="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-semibold text-[11px] shrink-0">
                        ${(item.createdBy?.name || 'S')[0].toUpperCase()}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-zinc-200 truncate">${item.createdBy?.name || 'Student'}</span>
                            <span class="text-[9px] text-zinc-500">3h ago</span>
                        </div>
                        <p class="text-xs text-zinc-300 mt-0.5 leading-relaxed">${item.text}</p>
                    </div>
                </div>
            `).join('');
        } else {
            panelBody.innerHTML = `<div class="text-xs text-zinc-500">No comments found.</div>`;
        }
    } catch (err) {
        panelBody.innerHTML = `<div class="text-xs text-red-400">Failed to load comments.</div>`;
    }
}

// 2. Timeline
async function loadTimeline() {
    panelBody.innerHTML = `<div class="text-xs text-zinc-500 animate-pulse">Loading timeline...</div>`;
    try {
        const data = await fetchSafeData(API_ENDPOINTS.slides);
        const slides = data.data || [];

        if (slides.length > 0) {
            panelBody.innerHTML = slides.map((slide, i) => `
                <div class="bg-[#12131c] p-2 rounded-xl border border-zinc-800/60 flex items-center space-x-2.5">
                    <img src="${slide.image || slide.imageUrl || 'https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/4a144fcc-5b0e-44e0-b587-a840149cab1b.png'}" class="w-20 h-12 object-cover rounded-lg shrink-0">
                    <div class="flex-1 min-w-0">
                        <div class="text-xs font-semibold text-zinc-200">Slide No. ${i + 1}</div>
                        <div class="text-[10px] text-zinc-400 truncate mt-0.5">${slide.title || 'Topic Slide'}</div>
                    </div>
                </div>
            `).join('');
        } else {
            panelBody.innerHTML = `<div class="bg-[#12131c] p-2.5 rounded-xl border border-zinc-800/60"><div class="text-xs font-semibold text-zinc-200">Slide No. 1</div><p class="text-[10px] text-zinc-400 mt-0.5">Overview</p></div>`;
        }
    } catch (err) {
        panelBody.innerHTML = `<div class="text-xs text-zinc-400">Timeline loaded.</div>`;
    }
}

// 3. Attachments
async function loadAttachments() {
    panelBody.innerHTML = `
        <div class="space-y-3">
            <div>
                <div class="text-[11px] font-semibold text-zinc-400 mb-1.5">Notes</div>
                <div class="bg-[#12131c] p-2.5 rounded-xl border border-zinc-800/60 flex items-center justify-between">
                    <span class="text-xs text-zinc-200 truncate pr-2">Quadratic Equations 11 Class Notes.pdf</span>
                    <button class="text-xs text-zinc-400 hover:text-white shrink-0"><i class="fa-solid fa-download"></i></button>
                </div>
            </div>
            <div>
                <div class="text-[11px] font-semibold text-zinc-400 mb-1.5">DPP</div>
                <div class="bg-[#12131c] p-2.5 rounded-xl border border-zinc-800/60 flex items-center justify-between">
                    <span class="text-xs text-zinc-200 truncate pr-2">Quadratic Equations DPP 08.pdf</span>
                    <button class="text-xs text-zinc-400 hover:text-white shrink-0"><i class="fa-solid fa-download"></i></button>
                </div>
            </div>
        </div>
    `;
}

// 4. More Lectures
async function loadMoreLectures() {
    panelBody.innerHTML = `<div class="text-xs text-zinc-500 animate-pulse">Loading lectures...</div>`;
    try {
        const data = await fetchSafeData(API_ENDPOINTS.moreLectures);
        const lectures = data.data || [];

        if (lectures.length > 0) {
            panelBody.innerHTML = lectures.map(lec => `
                <div class="bg-[#12131c] p-2 rounded-xl border border-zinc-800/60 flex items-center space-x-2.5">
                    <div class="relative shrink-0">
                        <img src="${lec.videoDetails?.image || 'https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/4a144fcc-5b0e-44e0-b587-a840149cab1b.png'}" class="w-20 h-12 object-cover rounded-lg">
                        <span class="absolute bottom-1 right-1 bg-black/80 text-[8px] px-1 rounded text-white">${lec.videoDetails?.duration || '01:50:00'}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="text-xs font-semibold text-zinc-200 truncate">${lec.topic || 'Lecture Item'}</div>
                    </div>
                </div>
            `).join('');
        }
    } catch (e) {
        panelBody.innerHTML = `<div class="text-xs text-zinc-400">Lectures loaded.</div>`;
    }
}

// 5. Ask AI
function loadAskAI() {
    panelBody.innerHTML = `
        <div class="flex flex-col h-full justify-between">
            <div class="bg-[#12131c] p-3 rounded-xl border border-zinc-800/60">
                <div class="flex items-center space-x-2 mb-1.5">
                    <span class="text-sm">👦</span>
                    <span class="text-xs font-semibold text-zinc-200">StudyAura AI Bot</span>
                </div>
                <p class="text-xs text-zinc-400 leading-relaxed">
                    Welcome To StudyAura Website, I am here to help you. Ask me a doubt about this lecture to get started.
                </p>
            </div>
            
            <div class="mt-3 flex items-center gap-2 pb-1">
                <input type="text" placeholder="Type your doubt..." class="flex-1 bg-[#12131c] border border-zinc-800 text-xs text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-500">
                <button class="bg-blue-600 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold shrink-0"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    `;
}

// Tab Switcher
function switchTab(tab) {
    document.querySelectorAll('#panelTabs button').forEach(btn => btn.classList.remove('active-tab'));
    const activeBtn = document.getElementById(`btn-${tab}`);
    if (activeBtn) activeBtn.classList.add('active-tab');

    if (tab === 'comments') loadComments();
    else if (tab === 'timeline') loadTimeline();
    else if (tab === 'attachments') loadAttachments();
    else if (tab === 'lectures') loadMoreLectures();
    else if (tab === 'ai') loadAskAI();
}

// Initial Tab Load
switchTab('comments');
