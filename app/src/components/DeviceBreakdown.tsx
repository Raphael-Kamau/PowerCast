import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { Wind, Fire, Lightbulb, Cpu, Tv, Droplet } from 'react-bootstrap-icons';

interface Device {
  _id: string;
  name: string;
  consumption: number;
  status: string;
}

interface ChartData {
  name: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  consumption: number;
  status: string;
}

// Match backend seed device names
const DEVICE_ICONS: { [key: string]: { icon: React.ReactNode; color: string } } = {
  'Air Conditioner': { icon: <Wind size={20} />, color: '#0066CC' },
  'Refrigerator': { icon: <Fire size={20} />, color: '#00CC66' },
  'Washing Machine': { icon: <Tv size={20} />, color: '#FF00FF' },
  'Lighting System': { icon: <Lightbulb size={20} />, color: '#FFCC00' },
  'Computer': { icon: <Cpu size={20} />, color: '#000000' },
  'default': { icon: <Droplet size={20} />, color: '#FF9900' }
};

export const DeviceBreakdown: React.FC = () => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/devices')
      .then(response => response.json())
      .then((data: Device[]) => {
        const total = data.reduce((sum, device) => sum + device.consumption, 0);
        const processedData = data.map((device, index) => ({
          name: device.name,
          value: parseFloat(((device.consumption / total) * 100).toFixed(1)),
          icon: DEVICE_ICONS[device.name]?.icon || DEVICE_ICONS['default'].icon,
          color: DEVICE_ICONS[device.name]?.color || Object.values(DEVICE_ICONS)[index % Object.values(DEVICE_ICONS).length].color,
          consumption: device.consumption,
          status: device.status
        }));
        setChartData(processedData);
      })
      .catch(error => console.error('Error fetching devices:', error));
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, consumption, value, status } = payload[0].payload;
      return (
        <div className={`p-2 rounded shadow-sm ${theme === 'dark' ? 'bg-dark text-light border border-secondary' : 'bg-white'}`}>
          <p className="mb-1 fw-bold">{name}</p>
          <p className="mb-0">{consumption} kWh ({value}%)</p>
          <small>Status: {status}</small>
        </div>
      );
    }
    return null;
  };

  const renderLabel = ({ name, value, payload }: any) => {
    return `${name}: ${payload.consumption} kWh (${value}%)`;
  };

  return (
    <div className={`card p-4 ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}>
      <h5 className="mb-1">Device Breakdown</h5>
      <small className={theme === 'dark' ? 'text-secondary' : 'text-muted'}>
        Energy consumption by device
      </small>

      {/* Pie Chart */}
      <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              label={renderLabel}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Device Information Section */}
      <div className="mt-4">
        {chartData.map((device, index) => (
          <div
            key={index}
            className={`d-flex align-items-center justify-content-between mb-3 pb-2 ${theme === 'dark' ? 'border-secondary' : 'border-light'}`}
            style={{ borderBottom: `1px solid ${theme === 'dark' ? '#444' : '#e0e0e0'}` }}
          >
            {/* Left side: icon + name */}
            <div className="d-flex align-items-center gap-2" style={{ flex: 1 }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: device.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                {device.icon}
              </div>
              <div>
                <p className="mb-0 fw-bold">{device.name}</p>
                <small className={theme === 'dark' ? 'text-secondary' : 'text-muted'}>
                  {device.consumption} kWh
                </small>
              </div>
            </div>

            {/* Right side: percentage + status */}
            <div className="text-right">
              <span className="fw-bold" style={{ color: device.color, fontSize: '16px' }}>
                {device.value}%
              </span>
              <br />
              <small className={theme === 'dark' ? 'text-secondary' : 'text-muted'}>
                Status: {device.status}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceBreakdown;
