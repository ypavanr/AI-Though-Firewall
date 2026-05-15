import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, X, ChevronRight, Share2, Heart, MessageCircle } from 'lucide-react';

export default function BrowserShield() {
  const [hoveredPost, setHoveredPost] = useState(null);

  const posts = [
    {
      id: 1,
      author: "Finance Guru X",
      handle: "@invest_now_100",
      content: "URGENT: The market is about to CRASH tomorrow! Transfer all your funds to our secure crypto vault immediately or lose everything! The government is hiding this! Click here now!",
      manipulationType: "fear",
      explanation: "Exploits loss aversion and creates false urgency to bypass critical thinking and prompt immediate, unsafe action.",
      risk: "critical"
    },
    {
      id: 2,
      author: "Health Freedom Daily",
      handle: "@health_truth",
      content: "Doctors are terrified of this new natural remedy! They don't want you to know that eating 3 raw onions a day cures everything. Big Pharma is trying to ban this post!",
      manipulationType: "conspiracy",
      explanation: "Uses 'hidden secret' framing and in-group/out-group bias to sell unverified claims as suppressed truth.",
      risk: "high"
    },
    {
      id: 3,
      author: "Tech Insights",
      handle: "@tech_daily",
      content: "Apple just announced their new M4 chip architecture today, boasting a 20% performance increase over the previous generation in multi-core tasks.",
      manipulationType: "none",
      risk: "low"
    }
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">Browser Shield Simulation</h1>
        <p className="text-slate-400 mt-1">Experience how the Thought Firewall overlays cognitive protection on a social feed.</p>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-slate-700 overflow-hidden relative shadow-2xl">
        {/* Fake Browser Toolbar */}
        <div className="h-12 bg-[#f1f3f4] border-b border-slate-300 flex items-center px-4 gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 bg-white rounded-full h-7 border border-slate-300 flex items-center px-3 text-sm text-slate-500 font-mono shadow-inner">
            <span className="text-green-600 mr-2">🔒</span> https://social-network.example.com
          </div>
          <div className="relative">
            <ShieldAlert size={20} className="text-[var(--color-cyber-blue)] drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
          </div>
        </div>

        {/* Fake Social Feed */}
        <div className="bg-[#f7f9f9] h-full overflow-y-auto pb-20">
          <div className="max-w-xl mx-auto bg-white min-h-full border-x border-slate-200">
            <div className="p-4 border-b border-slate-200 font-bold text-xl text-slate-900 sticky top-0 bg-white/80 backdrop-blur z-10">
              Home
            </div>

            {posts.map((post) => (
              <div 
                key={post.id} 
                className="p-4 border-b border-slate-200 relative group cursor-pointer"
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                {/* AI Overlay Protection */}
                <AnimatePresence>
                  {post.risk !== 'low' && hoveredPost === post.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute left-0 top-0 w-full h-full p-4 z-20 backdrop-blur-sm bg-slate-900/90 border border-slate-700 shadow-xl
                        ${post.risk === 'critical' ? 'shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'shadow-[0_0_20px_rgba(249,115,22,0.3)]'}
                      `}
                    >
                      <div className="flex flex-col h-full justify-center items-center text-center px-6">
                        <AlertTriangle className={`mb-3 ${post.risk === 'critical' ? 'text-red-500' : 'text-orange-500'}`} size={32} />
                        <h4 className="text-lg font-bold text-white mb-2">Cognitive Manipulation Detected</h4>
                        <p className="text-sm text-slate-300 mb-4">{post.explanation}</p>
                        
                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-slate-800 text-white rounded font-medium hover:bg-slate-700 text-sm border border-slate-600 transition-colors">
                            Reveal Original Content
                          </button>
                          <button className={`px-4 py-2 rounded font-medium text-white text-sm transition-colors
                            ${post.risk === 'critical' ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}
                          `}>
                            Block Author
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Normal Post Content */}
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-300 shrink-0 flex items-center justify-center font-bold text-slate-500">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-bold text-slate-900">{post.author}</span>
                      <span className="text-slate-500">{post.handle}</span>
                      <span className="text-slate-500">· 2h</span>
                      
                      {/* Subtly injected firewall icon when not hovered */}
                      {post.risk !== 'low' && (
                        <span className={`ml-auto px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1
                          ${post.risk === 'critical' ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-orange-100 text-orange-600 border border-orange-200'}
                        `}>
                          <ShieldAlert size={10} /> Suspicious
                        </span>
                      )}
                    </div>
                    
                    {/* The content itself, slightly blurred if dangerous */}
                    <p className={`text-slate-800 text-[15px] leading-relaxed transition-all duration-300
                      ${post.risk !== 'low' && hoveredPost !== post.id ? 'blur-[1px] opacity-80' : ''}
                    `}>
                      {post.content}
                    </p>

                    <div className="flex justify-between mt-4 text-slate-500 max-w-md">
                      <MessageCircle size={18} className="hover:text-blue-500 transition-colors" />
                      <Share2 size={18} className="hover:text-green-500 transition-colors" />
                      <Heart size={18} className="hover:text-pink-500 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
