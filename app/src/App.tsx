import React, { useState } from "react";
import { EnergyMetrics } from "./components/EnergyMetrics";
import { EnergyChart } from "./components/EnergyChart";
import { PredictionChart } from "./components/PredictionChart";
import { DeviceBreakdown } from "./components/DeviceBreakdown";
import { AlertPanel } from "./components/AlertPanel";
import { Button } from "./components/ui/Button";
import { Bell, Download, GearFill, Moon, Sun } from "react-bootstrap-icons";
import { useTheme } from "./context/ThemeContext";
import { SettingsModal } from "./components/SettingsModal";
import { ExportModal } from "./components/ExportModal";
import { exportToCSV, exportToJSON, generateMockEnergyData } from "./utils/exportData";
import 'bootstrap/dist/css/bootstrap.min.css'

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleExport = (format: string, dateRange: string) => {
    const mockData = generateMockEnergyData();
    const timestamp = new Date().toISOString().split('T')[0];
    
    if (format === 'csv') {
      exportToCSV(mockData, `energy-data-${dateRange}-${timestamp}.csv`);
    } else if (format === 'json') {
      exportToJSON(mockData, `energy-data-${dateRange}-${timestamp}.json`);
    }
  };

  return (
    <div className={`min-vh-100 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light'}`}>
      {/* Header */}
      <header className={`border-bottom ${theme === 'dark' ? 'bg-dark border-secondary' : 'bg-white'} sticky-top shadow-sm`}>
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-secondary rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <img src="/logo.png" alt="Energy Monitor Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <h1 className="h5 mb-0 fw-bold">Energy Monitor</h1>
              <small className={theme === 'dark' ? 'text-secondary' : 'text-muted'}>Real-time monitoring & predictions</small>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="me-2" /> Notifications
            </Button>
            <Button variant="outline" onClick={() => setShowExport(true)}>
              <Download className="me-2" /> Export Data
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
              <GearFill className="me-2" /> Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="container py-4">
        <div className="mb-4">
          <EnergyMetrics />
        </div>

        <div className="row g-4 mb-4">
          <div className="col-lg-8">
            <EnergyChart />
          </div>
          <div className="col-lg-4">
            <DeviceBreakdown />
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <PredictionChart />
          </div>
          <div className="col-lg-4">
            <AlertPanel />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`border-top ${theme === 'dark' ? 'bg-dark border-secondary' : 'bg-white'} mt-5 py-3`}>
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className={theme === 'dark' ? 'text-secondary' : 'text-muted'}>
            <small>
              {new Date().toLocaleString()} • Data refreshes every five minutes
            </small>
          </div>
          <div className={`d-flex gap-3 small ${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}>
            <a href="#" className={`text-decoration-none ${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}> Privacy Policy</a>
            <span>•</span>
            <a href="#" className={`text-decoration-none ${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}> Help Center</a>
            <span>•</span>
            <a href="#" className={`text-decoration-none ${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}> API Docs</a>
          </div>
        </div>
      </footer>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} onExport={handleExport} />
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;