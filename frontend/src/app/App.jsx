import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import LiveAnalysis from '../pages/LiveAnalysis';
import AgentMonitor from '../pages/AgentMonitor';
import ThreatFeed from '../pages/ThreatFeed';
import BrowserShield from '../pages/BrowserShield';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<LiveAnalysis />} />
          <Route path="/agents" element={<AgentMonitor />} />
          <Route path="/threats" element={<ThreatFeed />} />
          <Route path="/browser-shield" element={<BrowserShield />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
