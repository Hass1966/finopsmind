import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import FeaturesPage from './pages/FeaturesPage';
import ArchitecturePage from './pages/ArchitecturePage';
import PricingPage from './pages/PricingPage';
import DemoDashboard from './pages/DemoDashboard';
import DemoAgentAnalysis from './pages/DemoAgentAnalysis';
import DemoRecommendations from './pages/DemoRecommendations';
import DemoRemediations from './pages/DemoRemediations';
import DemoAnomalies from './pages/DemoAnomalies';
import DemoForecasts from './pages/DemoForecasts';
import DemoBudgets from './pages/DemoBudgets';
import DemoDynamicRules from './pages/DemoDynamicRules';
import DemoInventory from './pages/DemoInventory';
import DemoAllocations from './pages/DemoAllocations';
import DemoPolicies from './pages/DemoPolicies';
import DemoReports from './pages/DemoReports';
import DemoSettings from './pages/DemoSettings';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo/dashboard" element={<DemoDashboard />} />
          <Route path="/demo/agent" element={<DemoAgentAnalysis />} />
          <Route path="/demo/recommendations" element={<DemoRecommendations />} />
          <Route path="/demo/remediations" element={<DemoRemediations />} />
          <Route path="/demo/anomalies" element={<DemoAnomalies />} />
          <Route path="/demo/forecasts" element={<DemoForecasts />} />
          <Route path="/demo/budgets" element={<DemoBudgets />} />
          <Route path="/demo/rules" element={<DemoDynamicRules />} />
          <Route path="/demo/inventory" element={<DemoInventory />} />
          <Route path="/demo/allocations" element={<DemoAllocations />} />
          <Route path="/demo/policies" element={<DemoPolicies />} />
          <Route path="/demo/reports" element={<DemoReports />} />
          <Route path="/demo/settings" element={<DemoSettings />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
