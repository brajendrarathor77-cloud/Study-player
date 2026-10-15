const panelBody = document.getElementById('panelBody');

// Configured APIs List
const API_ENDPOINTS = {
    slides: "https://api.studyaura.online/api/penpencil/v1/batches/698ad3519549b300a5e1cc6a/subject/maths-by-sachin-jakhar-sir-095452/schedule/6a36be5222cc4e987a2374ad/slides", //
    scheduleDetails: "https://api.studyaura.online/api/penpencil/v1/batches/698ad3519549b300a5e1cc6a/subject/maths-by-sachin-jakhar-sir-095452/schedule/6a36be5222cc4e987a2374ad/schedule-details", //
    moreLectures: "https://api.studyaura.online/api/penpencil/batch-service/v3/batch-subject-schedules/698ad3519549b300a5e1cc6a/subject/69b569e8cd9eea58b9fe60da/contents?skip=0&limit=30&contentType=LECTURES&tagId=69dc843271d06abbf386979f", //
    comments: "https://api.studyspark.study/api/comments/6a36be5222cc4e987a2374ad?isPinned=true", //
    pinnedComment: "https://api.studyspark.study/api/comments/6a36be5222cc4e987a2374ad/pinned-comment", //
    commonDoubts: "https://api.studyaura.online/api/penpencil/v1/doubts/6a36be5222cc4e987a2374ad/6a3913017624e88770599826/get-common-doubts" //
};

// 1. Load Comments Section
async function loadComments() {
    panelBody.innerHTML = `<div class="text-xs text-zinc-500 animate-pulse">Loading comments...</div>`;
    try {
        const res = await fetch(API_ENDPOINTS.comments);
        const data = await res.json();
        
        if (data.success && data.data) {
            panelBody.innerHTML = data.data.map(item => `
                <div class="bg-[#12131c] p-3 rounded-xl border border-zinc-800/60 flex items-start space-x-3">
                    <div class="w-7 h-7 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-semibold text-xs flex-shrink-0">
                        ${(item.createdBy?.name || 'S')[0].toUpperCase()}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-zinc-200 truncate">${item.createdBy?.name || 'Student'}</span>
                            <span class="text-[10px] text-zinc-500">${new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p class="text-xs text-zinc-300 mt-1 leading-relaxed">${item.text}</p>
                        <div class="flex items-center space-x-1 mt-2 text-zinc-500 text-[11px]">
                            <i class="fa-regular fa-thumbs-up"></i>
                            <span>${item.upvoteCount || 0}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (err) {
        panelBody.innerHTML = `<div class="text-xs text-red-400">Failed to load comments.</div>`;
    }
}

// 2. Load Timeline / Slides Section
async function loadTimeline() {
    panelBody.innerHTML = `<div class="text-xs text-zinc-500 animate-pulse">Loading slides timeline...</div>`;
    try {
        const res = await fetch(API_ENDPOINTS.slides);
        const data = await res.json();
        
        if (data.success && data.data) {
            panelBody.innerHTML = data.data.map((slide, index) => `
                <div class="bg-[#12131c] p-2.5 rounded-xl border border-zinc-800/60 flex items-center space-x-3 cursor-pointer hover:border-purple-500/50">
                    <img src="${slide.image || slide.imageUrl || 'https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/4a144fcc-5b0e-44e0-b587-a840149cab1b.png'}" class="w-24 h-14 object-cover rounded-lg">
                    <div class="flex-1 min-w-0">
                        <div class="text-xs font-semibold text-zinc-200">Slide No. ${index + 1}</div>
                        <div class="text-[10px] text-zinc-400 mt-0.5">${slide.title || 'Topic Slide'}</div>
                    </div>
                </div>
            `).join('');
        }
    } catch (err) {
        panelBody.innerHTML = `<div class="text-xs text-zinc-400">Timeline loaded.</div>`;
    }
}

// 3. Load Attachments / Class Notes
async function loadAttachments() {
    panelBody.innerHTML = `<div class="text-xs text-zinc-500 animate-pulse">Loading attachments...</div>`;
    try {
        const res = await fetch(API_ENDPOINTS.scheduleDetails);
        const data = await res.json();
        
        panelBody.innerHTML = `
            <div class="space-y-4">
                <div>
                    <div class="text-xs font-semibold text-zinc-400 mb-2">Notes</div>
                    <div class="bg-[#12131c] p-3 rounded-xl border border-zinc-800/60 flex items-center justify-between">
                        <span class="text-xs text-zinc-200">Quadratic Equations 11 Class Notes.pdf</span>
                        <button class="text-xs text-zinc-400 hover:text-white"><i class="fa-solid fa-download"></i></button>
                    </div>
                </div>
                <div>
                    <div class="text-xs font-semibold text-zinc-400 mb-2">DPP</div>
                    <div class="bg-[#12131c] p-3 rounded-xl border border-zinc-800/60 flex items-center justify-between">
                        <span class="text-xs text-zinc-200">Quadratic Equations DPP 08 (of lec 11).pdf</span>
                        <button class="text-xs text-zinc-400 hover:text-white"><i class="fa-solid fa-download"></i></button>
                    </div>
                </div>
            </div>
        `;
    } catch (err) {
        panelBody.innerHTML = `<div class="text-xs text-zinc-400">Attachments loaded.</div>`;
    }
}

// 4. Load More Lectures
async function loadMoreLectures() {
    panelBody.innerHTML = `<div class="text-xs text-zinc-500 animate-pulse">Loading lectures...</div>`;
    try {
        const res = await fetch(API_ENDPOINTS.moreLectures);
        const data = await res.json();
        
        if (data.data) {
            panelBody.innerHTML = data.data.map(lec => `
                <div class="bg-[#12131c] p-2.5 rounded-xl border border-zinc-800/60 flex items-center space-x-3 cursor-pointer hover:border-blue-500/50">
                    <div class="relative flex-shrink-0">
                        <img src="${lec.videoDetails?.image || 'https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/4a144fcc-5b0e-44e0-b587-a840149cab1b.png'}" class="w-24 h-14 object-cover rounded-lg">
                        <span class="absolute bottom-1 right-1 bg-black/80 text-[9px] px-1 rounded text-white">${lec.videoDetails?.duration || '01:50:00'}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="text-xs font-semibold text-zinc-200 truncate">${lec.topic}</div>
                    </div>
                </div>
            `).join('');
        }
    } catch (err) {
        panelBody.innerHTML = `<div class="text-xs text-zinc-400">More lectures loaded.</div>`;
    }
}

// 5. Load Ask AI View
function loadAskAI() {
    panelBody.innerHTML = `
        <div class="flex flex-col h-full justify-between">
            <div class="bg-[#12131c] p-4 rounded-xl border border-zinc-800/60">
                <div class="flex items-center space-x-2 mb-2">
                    <span class="text-base">🤖</span>
                    <span class="text-xs font-semibold text-zinc-200">StudyAura AI Bot</span>
                </div>
                <p class="text-xs text-zinc-400 leading-relaxed">
                    Welcome To StudyAura Website, I am here to help you. Ask me a doubt about this lecture to get started.
                </p>
            </div>
            
            <div class="mt-4 flex items-center gap-2">
                <input type="text" placeholder="Type your doubt..." class="flex-1 bg-[#12131c] border border-zinc-800 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500">
                <button class="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl text-xs font-semibold"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    `;
}

// Tab Handler
function switchTab(tab) {
    document.querySelectorAll('#panelTabs button').forEach(btn => btn.classList.remove('active-tab'));
    
    const targetBtn = document.getElementById(`btn-${tab}`);
    if (targetBtn) targetBtn.classList.add('active-tab');

    if (tab === 'comments') loadComments();
    else if (tab === 'timeline') loadTimeline();
    else if (tab === 'attachments') loadAttachments();
    else if (tab === 'lectures') loadMoreLectures();
    else if (tab === 'ai') loadAskAI();
}

// Default Tab
switchTab('comments');
