import React, { useEffect, useState } from 'react';
import { ExclamationTriangleFill, ExclamationCircleFill, InfoCircleFill, Clock, Bell } from 'react-bootstrap-icons';

interface Alert {
  _id: string;
  timestamp: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export const AlertPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/alerts')
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(err => console.error('Error fetching alerts:', err));
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString(); // e.g. "24 Jan 2026, 17:04"
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'high':
        return { 
          borderClass: 'border-danger', 
          bgClass: 'bg-light', 
          icon: <ExclamationTriangleFill className="text-danger me-2" /> 
        };
      case 'medium':
        return { 
          borderClass: 'border-warning', 
          bgClass: 'bg-light', 
          icon: <ExclamationCircleFill className="text-warning me-2" /> 
        };
      default:
        return { 
          borderClass: 'border-success', 
          bgClass: 'bg-light', 
          icon: <InfoCircleFill className="text-success me-2" /> 
        };
    }
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(a => a._id !== id));
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
                  <h5 className="mb-0">
                      <Bell className="me-2" /> Alerts & Insights
          </h5>
          <small className="text-muted">Real-time notifications and recommendations</small>
        </div>
      </div>
      <div className="card-body">
        {alerts.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <ExclamationTriangleFill className="mb-2 opacity-25" size={32} />
            <p className="mb-0">No active alerts</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {alerts.map(a => {
              const { borderClass, bgClass, icon } = getSeverityStyle(a.severity);
              return (
                <div 
                  key={a._id} 
                  className={`p-3 rounded border ${borderClass} ${bgClass} position-relative`}
                >
                  <button 
                    type="button" 
                    className="btn-close position-absolute top-0 end-0 m-2" 
                    aria-label="Close" 
                    onClick={() => removeAlert(a._id)}
                  ></button>

                  <div className="d-flex align-items-start">
                    {icon}
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-1">
                        <strong className="me-2 text-capitalize">{a.severity}</strong>
                        <span className={`badge ${borderClass} text-uppercase`}>
                          {a.severity}
                        </span>
                      </div>
                      <p className="mb-1 small">{a.message}</p>
                      <div className="d-flex align-items-center text-muted small">
                        <Clock size={14} className="me-1" />
                        {formatDate(a.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertPanel;
