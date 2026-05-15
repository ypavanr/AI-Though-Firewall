// content.js - Injects overlay into dummy website

function injectAnalysisButtons() {
    // Look for posts in the dummy website (they have class 'card')
    const posts = document.querySelectorAll('.card');
    
    posts.forEach(post => {
        // Prevent duplicate injection
        if (post.querySelector('.ext-analyze-btn')) return;
        
        // Find the text content of the post
        const contentDiv = post.querySelector('.post-content');
        if (!contentDiv) return;
        
        const textContent = contentDiv.textContent.trim();
        
        // Create an extension specific button
        const btnContainer = document.createElement('div');
        btnContainer.className = 'ext-btn-container';
        
        const analyzeBtn = document.createElement('button');
        analyzeBtn.className = 'ext-analyze-btn';
        const scanSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: text-bottom;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
        
        analyzeBtn.innerHTML = `${scanSvg} Analyze Threat`;
        
        analyzeBtn.onclick = async () => {
            const loadingSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: text-bottom; animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`;
            analyzeBtn.innerHTML = `${loadingSvg} Analyzing...`;
            analyzeBtn.disabled = true;
            
            try {
                const res = await fetch('http://localhost:8000/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: textContent })
                });
                const data = await res.json();
                renderExtensionOverlay(post, data);
                
                if (data.reportId && !btnContainer.querySelector('.ext-detailed-btn')) {
                    const detailedBtn = document.createElement('button');
                    detailedBtn.className = 'ext-detailed-btn ext-analyze-btn';
                    detailedBtn.style.marginLeft = '10px';
                    detailedBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    const chartSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: text-bottom;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`;
                    detailedBtn.innerHTML = `${chartSvg} View Detailed Report`;
                    detailedBtn.onclick = () => {
                        window.open(`http://localhost:5173/analysis?reportId=${data.reportId}`, '_blank');
                    };
                    btnContainer.appendChild(detailedBtn);
                }
            } catch (err) {
                alert("Extension failed to contact backend. Is port 8000 running?");
            }
            
            const checkSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: text-bottom;"><path d="M20 6L9 17l-5-5"></path></svg>`;
            analyzeBtn.innerHTML = `${checkSvg} Analysis Complete`;
        };
        
        btnContainer.appendChild(analyzeBtn);
        // Insert right after the post content
        contentDiv.parentNode.insertBefore(btnContainer, contentDiv.nextSibling);
    });
}

function renderExtensionOverlay(postNode, data) {
    // Remove existing overlay if any
    const existing = postNode.querySelector('.ext-overlay');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'ext-overlay';
    
    let flagsHtml = '';
    if (data.flags && data.flags.length > 0) {
        flagsHtml = data.flags.map(f => `
            <div class="ext-flag">
                <strong><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> ${f.type} (${f.amount.toFixed(1)}%)</strong>
                <p>${f.details}</p>
            </div>
        `).join('');
    } else {
        flagsHtml = '<div class="ext-flag safe"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Content appears completely safe.</div>';
    }
    
    overlay.innerHTML = `
        <div class="ext-overlay-header">
            <h3>Firewall Extension Analysis</h3>
            <span class="ext-score">Risk: ${data.overallScore.toFixed(1)} / 100</span>
        </div>
        
        <div class="ext-summary">
            <strong><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg> AI Summary:</strong>
            <p>${data.aiSummary || "No summary generated."}</p>
        </div>
        
        <div class="ext-flags-container">
            <h4>Detailed Flags</h4>
            ${flagsHtml}
        </div>
    `;
    
    postNode.appendChild(overlay);
}

// Observe the DOM for dynamically loaded posts (React)
const observer = new MutationObserver((mutations) => {
    injectAnalysisButtons();
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial run
setTimeout(injectAnalysisButtons, 1000);
