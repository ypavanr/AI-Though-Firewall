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
        
        const textContent = contentDiv.innerText;
        
        // Create an extension specific button
        const btnContainer = document.createElement('div');
        btnContainer.className = 'ext-btn-container';
        
        const analyzeBtn = document.createElement('button');
        analyzeBtn.className = 'ext-analyze-btn';
        analyzeBtn.innerHTML = '🛡️ Analyze via Extension';
        
        analyzeBtn.onclick = async () => {
            analyzeBtn.innerHTML = '⏳ Analyzing...';
            analyzeBtn.disabled = true;
            
            try {
                const res = await fetch('http://localhost:8000/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: textContent })
                });
                const data = await res.json();
                renderExtensionOverlay(post, data);
            } catch (err) {
                alert("Extension failed to contact backend. Is port 8000 running?");
            }
            
            analyzeBtn.innerHTML = '🛡️ Analysis Complete';
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
                <strong>⚠️ ${f.type} (${f.amount.toFixed(1)}%)</strong>
                <p>${f.details}</p>
            </div>
        `).join('');
    } else {
        flagsHtml = '<div class="ext-flag safe">✅ Content appears completely safe.</div>';
    }
    
    overlay.innerHTML = `
        <div class="ext-overlay-header">
            <h3>Firewall Extension Analysis</h3>
            <span class="ext-score">Risk: ${data.overallScore.toFixed(1)} / 100</span>
        </div>
        
        <div class="ext-summary">
            <strong>🤖 AI Summary:</strong>
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
