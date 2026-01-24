import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';


interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${theme === 'dark' ? 'bg-dark text-light' : ''}`}>
          <div className="modal-header border-bottom">
            <h5 className="modal-title">Settings</h5>
            <button
              type="button"
              className={`btn-close ${theme === 'dark' ? 'btn-close-white' : ''}`}
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="mb-4">
              <h6 className="mb-3">Appearance</h6>
              <div className="d-flex align-items-center justify-content-between">
                <label className="mb-0">Dark Mode</label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="darkModeToggle"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                  />
                </div>
              </div>
            </div>

            <hr />

            <div className="mb-4">
              <h6 className="mb-3">Data Refresh</h6>
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <label className="mb-0">Auto Refresh</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="autoRefresh"
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                    />
                  </div>
                </div>
              </div>
              {autoRefresh && (
                <div>
                  <label htmlFor="refreshInterval" className="form-label mb-2">
                    Refresh Interval (minutes): {refreshInterval}
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    id="refreshInterval"
                    min="1"
                    max="30"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                  />
                </div>
              )}
            </div>

            <hr />

            <div className="mb-4">
              <h6 className="mb-3">About</h6>
              <small className={theme === 'dark' ? 'text-secondary' : 'text-muted'}>
                Energy Monitor v1.0<br />
                Real-time energy monitoring and prediction system<br />
                © 2026 All rights reserved
              </small>
            </div>
          </div>
          <div className="modal-footer border-top">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
