import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../context/ThemeContext';
import "chart.js/auto";

interface Metric {
  _id: string;
  timestamp: string;
  totalConsumption: number;
  peakLoad: number;
  cost?: number; // optional if you add cost in backend
}

export const EnergyChart: React.FC = () => {
  const { theme } = useTheme();
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/metrics')
      .then(response => response.json())
      .then(data => setMetrics(data))
      .catch(error => console.error('Error fetching metrics:', error));
  }, []);

  const chartData = {
    labels: metrics.map(metric => new Date(metric.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'Consumption (kWh)',
        data: metrics.map(metric => metric.totalConsumption),
        borderColor: theme === 'dark' ? '#4a9eff' : '#0066cc',
        backgroundColor: theme === 'dark' ? 'rgba(74,158,255,0.3)' : 'rgba(0,102,204,0.3)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Peak Load (kW)',
        data: metrics.map(metric => metric.peakLoad),
        borderColor: theme === 'dark' ? '#ff6b6b' : '#cc0000',
        backgroundColor: theme === 'dark' ? 'rgba(255,107,107,0.3)' : 'rgba(204,0,0,0.3)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
      },
      metrics.some(m => m.cost) && {
        label: 'Cost (KES)',
        data: metrics.map(metric => metric.cost || 0),
        borderColor: theme === 'dark' ? '#ffc107' : '#ff9900',
        backgroundColor: theme === 'dark' ? 'rgba(255,193,7,0.3)' : 'rgba(255,153,0,0.3)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
      }
    ].filter(Boolean),
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#ffffff' : '#000000',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            if (label.includes('Consumption')) return `${label}: ${value} kWh`;
            if (label.includes('Peak Load')) return `${label}: ${value} kW`;
            if (label.includes('Cost')) return `${label}: ${value} KES`;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        position: 'left',
        ticks: { color: theme === 'dark' ? '#ffffff' : '#000000' },
        grid: { color: theme === 'dark' ? '#444444' : '#e0e0e0' },
      },
      y1: {
        type: 'linear' as const,
        position: 'right',
        ticks: { color: theme === 'dark' ? '#ffffff' : '#000000' },
        grid: { drawOnChartArea: false },
      },
      x: {
        ticks: { color: theme === 'dark' ? '#ffffff' : '#000000' },
        grid: { color: theme === 'dark' ? '#444444' : '#e0e0e0' },
      },
    },
  };

  return (
    <div className={`card p-3 ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}>
      <h5>Energy Usage Trends</h5>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default EnergyChart;
