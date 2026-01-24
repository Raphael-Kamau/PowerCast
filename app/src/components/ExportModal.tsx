import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X } from 'react-bootstrap-icons';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string, dateRange: string) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onExport }) => {
  const { theme } = useTheme();
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedRange, setSelectedRange] = useState('today');

  const handleExport = () => {
    onExport(selectedFormat, selectedRange);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${theme === 'dark' ? 'bg-dark text-light' : ''}`}>
          <div className="modal-header border-bottom">
            <h5 className="modal-title">Export Data</h5>
            <button
              type="button"
              className={`btn-close ${theme === 'dark' ? 'btn-close-white' : ''}`}
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="mb-4">
              <h6 className="mb-3">Export Format</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="format"
                  id="csvFormat"
                  value="csv"
                  checked={selectedFormat === 'csv'}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                />
                <label className="form-check-label" htmlFor="csvFormat">
                  CSV (Comma-separated values)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="format"
                  id="jsonFormat"
                  value="json"
                  checked={selectedFormat === 'json'}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                />
                <label className="form-check-label" htmlFor="jsonFormat">
                  JSON (JavaScript Object Notation)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="format"
                  id="excelFormat"
                  value="xlsx"
                  checked={selectedFormat === 'xlsx'}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                />
                <label className="form-check-label" htmlFor="excelFormat">
                  Excel (XLSX)
                </label>
              </div>
            </div>

            <hr />

            <div className="mb-4">
              <h6 className="mb-3">Date Range</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="range"
                  id="today"
                  value="today"
                  checked={selectedRange === 'today'}
                  onChange={(e) => setSelectedRange(e.target.value)}
                />
                <label className="form-check-label" htmlFor="today">
                  Today
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="range"
                  id="week"
                  value="week"
                  checked={selectedRange === 'week'}
                  onChange={(e) => setSelectedRange(e.target.value)}
                />
                <label className="form-check-label" htmlFor="week">
                  Last 7 Days
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="range"
                  id="month"
                  value="month"
                  checked={selectedRange === 'month'}
                  onChange={(e) => setSelectedRange(e.target.value)}
                />
                <label className="form-check-label" htmlFor="month">
                  Last 30 Days
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="range"
                  id="all"
                  value="all"
                  checked={selectedRange === 'all'}
                  onChange={(e) => setSelectedRange(e.target.value)}
                />
                <label className="form-check-label" htmlFor="all">
                  All Data
                </label>
              </div>
            </div>
          </div>
          <div className="modal-footer border-top">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleExport}
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
