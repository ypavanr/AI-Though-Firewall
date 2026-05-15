import React, { useState } from 'react';
import { dummyPosts } from './data';
import { 
  ShieldAlert, 
  Mail, 
  MessageSquare, 
  FileText, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Share2,
  Heart,
  MessageCircle
} from 'lucide-react';
import './index.css';

const API_URL = 'http://localhost:8000/api/analyze';

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [analyzingIds, setAnalyzingIds] = useState(new Set());
  const [analysisResults, setAnalysisResults] = useState({});
  const [hiddenAds, setHiddenAds] = useState(new Set());

  const hideAd = (id) => {
    setHiddenAds(prev => new Set(prev).add(id));
  };

  const filteredPosts = dummyPosts.filter(post => 
    (activeTab === 'all' || post.type === activeTab) && !hiddenAds.has(post.id)
  );

  const analyzeContent = async (id, text) => {
    setAnalyzingIds(prev => new Set(prev).add(id));
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      setAnalysisResults(prev => ({
        ...prev,
        [id]: data
      }));
    } catch (error) {
      console.error('Error analyzing content:', error);
      alert('Failed to connect to AI Firewall Backend. Is it running on port 8000?');
    } finally {
      setAnalyzingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const renderAnalysis = (result) => {
    if (!result) return null;

    const getSeverityClass = (score) => {
      if (score > 70) return 'risk-high';
      if (score > 30) return 'risk-med';
      return 'risk-low';
    };

    return (
      <div className="analysis-panel">
        <div className="analysis-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={20} color="var(--accent)" />
            <h3 style={{ fontSize: '1.1rem' }}>AI Firewall Analysis</h3>
          </div>
          <div className={`risk-badge ${getSeverityClass(result.overallScore)}`}>
            Risk Score: {result.overallScore.toFixed(1)} / 100
          </div>
        </div>

        <div className="analysis-grid">
          {/* Detected Techniques / Highlights */}
          <div className="analysis-box" style={{ gridColumn: '1 / -1' }}>
            <div className="box-title">Detected Threats</div>
            {result.highlights && result.highlights.length > 0 ? (
              result.highlights.map((h, i) => (
                <div key={i} className="highlight-item">
                  <strong>"{h.text}"</strong>
                  <span>{h.explanation}</span>
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--risk-low)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} /> No manipulation detected
              </div>
            )}
          </div>

          {/* AI Detection */}
          <div className="analysis-box">
            <div className="box-title">AI Generation Probability</div>
            <div className="ai-prob">
              {result.aiDetection ? (result.aiDetection.probability * 100).toFixed(1) : 0}%
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {result.aiDetection?.classification || "Unknown"}
            </div>
          </div>

          {/* Misinformation Claims */}
          <div className="analysis-box">
            <div className="box-title">Fact Check (Misinformation)</div>
            {result.misinformation && result.misinformation.claims && result.misinformation.claims.length > 0 ? (
              result.misinformation.claims.slice(0, 2).map((claim, i) => (
                <div key={i} className="misinfo-claim">
                  <strong>Claim:</strong> {claim.text}
                  {claim.claimReview && claim.claimReview[0] && (
                    <div style={{ marginTop: '0.25rem', color: 'var(--risk-high)' }}>
                      Rating: {claim.claimReview[0].textualRating}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--text-muted)' }}>No misinformation claims found.</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCard = (post) => {
    const isAnalyzing = analyzingIds.has(post.id);
    const hasResult = !!analysisResults[post.id];
    const isAd = post.type === 'ad';

    return (
      <div key={post.id} className={`card ${isAd ? 'ad-card' : ''}`}>
        <div className="card-header">
          <div className="author-info">
            <img src={post.avatar} alt={post.author} className="avatar" />
            <div>
              <div className="author-name">{post.author}</div>
              <div className="post-time">{post.time} • {post.type.toUpperCase()}</div>
            </div>
          </div>
          {isAd && (
            <button className="close-ad-btn" onClick={() => hideAd(post.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
          )}
        </div>

        {post.subject && <div className="post-subject">{post.subject}</div>}
        {post.title && <div className="post-title">{post.title}</div>}
        
        <div className="post-content" style={isAd ? { position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' } : {}}>
          {post.content}
        </div>

        {isAd && post.image && (
          <a href={post.link} target="_blank" rel="noreferrer" className="ad-image-container" style={{ display: 'block', margin: '0.5rem 0 1.5rem 0' }}>
            <img src={`/src/assets/${post.image}`} alt="Advertisement" style={{ width: '100%', borderRadius: '0.5rem', cursor: 'pointer', border: '1px solid var(--border)' }} />
          </a>
        )}

        {hasResult && renderAnalysis(analysisResults[post.id])}

        {!hasResult && (
          <div className="card-footer">
            <div className="stats">
              {post.likes !== undefined && (
                <div className="stat-item"><Heart size={16} /> {post.likes}</div>
              )}
              {post.comments !== undefined && (
                <div className="stat-item"><MessageCircle size={16} /> {post.comments}</div>
              )}
            </div>
            <div className="stat-item"><Share2 size={16} /> Share</div>
          </div>
        )}
      </div>
    );
  };

  const regularPosts = filteredPosts.filter(p => p.type !== 'ad');
  const activeAds = dummyPosts.filter(p => p.type === 'ad' && !hiddenAds.has(p.id));

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <ShieldAlert size={28} />
          Nexus
        </div>
        
        <div 
          className={`nav-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <Activity size={20} /> All Content
        </div>
        <div 
          className={`nav-item ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          <MessageSquare size={20} /> Social Feed
        </div>
        <div 
          className={`nav-item ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          <FileText size={20} /> Blogs & Articles
        </div>
        <div 
          className={`nav-item ${activeTab === 'email' ? 'active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          <Mail size={20} /> Inbox
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>
            {activeTab === 'all' && 'My Feed'}
            {activeTab === 'social' && 'Social Media'}
            {activeTab === 'blog' && 'Reading List'}
            {activeTab === 'email' && 'Primary Inbox'}
          </h1>
        </div>

        <div className="feed">
          {regularPosts.map(renderCard)}
        </div>
      </div>

      <div className="right-sidebar">
        <div className="right-sidebar-title">Sponsored</div>
        {activeAds.map(renderCard)}
      </div>
    </div>
  );
}

export default App;
