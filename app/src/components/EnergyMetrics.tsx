import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Metrics {
    _id: string;
    timestamp: string;
    totalConsumption: number;
    peakLoad: number;
    cost: number;
}

export const EnergyMetrics: React.FC = () => {
    const { theme } = useTheme();
    const [metrics, setMetrics] = useState<Metrics[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/metrics')
            .then(response => response.json())
            .then(data => setMetrics(data))
            .catch(error => console.error('Error fetching metrics:', error));
    }, []);

    if (!metrics.length) return <p>Loading Metrics...</p>; 

    const latest = metrics[0];

    return (
        <div className="row">
            <div className="col-md-4">
                <div className={`card text-center ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}>
                    <div className="card-body">
                        <h5 className="card-title">Total Consumption</h5>
                        <p>{latest.totalConsumption} kWh</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className={`card text-center ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}>
                    <div className="card-body">
                        <h5 className="card-title">Peak Load</h5>
                        <p>{latest.peakLoad} kW</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className={`card text-center ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}>
                    <div className="card-body">
                        <h5 className="card-title">Cost</h5>
                        <p>{latest.cost} KSH</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergyMetrics;