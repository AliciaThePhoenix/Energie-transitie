import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function EnergyChart({ data, type = 'line', title = 'Energieverbruik' }) {
  const [chartType, setChartType] = useState(type);
  const [timeRange, setTimeRange] = useState('24h');
  const [energyType, setEnergyType] = useState('all');

  const chartTypes = [
    { value: 'line', label: 'Lijn' },
    { value: 'bar', label: 'Staaf' },
    { value: 'doughnut', label: 'Cirkel' }
  ];

  const timeRanges = [
    { value: '24h', label: '24 uur' },
    { value: '7d', label: '7 dagen' },
    { value: '30d', label: '30 dagen' }
  ];

  const energyTypes = [
    { value: 'all', label: 'Alle' },
    { value: 'elektriciteit', label: 'Elektriciteit' },
    { value: 'gas', label: 'Gas' }
  ];

  // Filter data based on selections
  const filteredData = data?.filter(item => {
    if (energyType !== 'all' && item.type !== energyType) return false;
    
    const itemDate = new Date(item.datum + ' ' + item.tijd);
    const now = new Date();
    const diffHours = (now - itemDate) / (1000 * 60 * 60);
    
    switch (timeRange) {
      case '24h': return diffHours <= 24;
      case '7d': return diffHours <= 24 * 7;
      case '30d': return diffHours <= 24 * 30;
      default: return true;
    }
  }) || [];

  // Prepare chart data
  const chartData = {
    labels: filteredData.map(item => `${item.datum} ${item.tijd}`),
    datasets: [
      {
        label: 'Verbruik (kWh)',
        data: filteredData.map(item => item.verbruik_kwh),
        borderColor: 'rgb(102, 126, 234)',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Kosten (€)',
        data: filteredData.map(item => item.kosten_euro),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.1,
      }
    ]
  };

  const doughnutData = {
    labels: ['Elektriciteit', 'Gas'],
    datasets: [{
      data: [
        filteredData.filter(item => item.type === 'elektriciteit').reduce((sum, item) => sum + item.verbruik_kwh, 0),
        filteredData.filter(item => item.type === 'gas').reduce((sum, item) => sum + item.verbruik_kwh, 0)
      ],
      backgroundColor: [
        'rgba(102, 126, 234, 0.8)',
        'rgba(255, 99, 132, 0.8)'
      ],
      borderColor: [
        'rgba(102, 126, 234, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'doughnut':
        return <Doughnut data={doughnutData} options={options} />;
      default:
        return <Line data={chartData} options={options} />;
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <div className="loading">
          <div className="spinner"></div>
          Laden...
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <div className="chart-controls">
          <select 
            className="select-control"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            {chartTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          
          <select 
            className="select-control"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          
          <select 
            className="select-control"
            value={energyType}
            onChange={(e) => setEnergyType(e.target.value)}
          >
            {energyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div style={{ height: '400px', position: 'relative' }}>
        {renderChart()}
      </div>
    </div>
  );
} 