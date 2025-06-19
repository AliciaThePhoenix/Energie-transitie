import { useState } from 'react';
import Head from 'next/head';
import EnergyChart from '../components/EnergyChart';
import EnergyTable from '../components/EnergyTable';
import useDataFetcher from '../components/DataFetcher';

export default function CO2() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [targetReduction, setTargetReduction] = useState(20);
  
  const { data, loading, error, updateParams, refreshData } = useDataFetcher({
    limit: 168
  });

  const periods = [
    { value: '24h', label: 'Laatste 24 uur' },
    { value: '7d', label: 'Laatste 7 dagen' },
    { value: '30d', label: 'Laatste 30 dagen' }
  ];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    const limits = { '24h': 24, '7d': 168, '30d': 720 };
    updateParams({ limit: limits[period] });
  };

  const calculateCO2Impact = () => {
    if (!data?.totals || !data?.data) return {};

    const totalCO2 = data.totals.total_co2;
    const totalConsumption = data.totals.total_verbruik;
    
    const daysInData = data.data.length / 24;
    const dailyCO2 = totalCO2 / daysInData;
    const yearlyCO2 = dailyCO2 * 365;
    
    return {
      total: totalCO2,
      daily: dailyCO2,
      yearly: yearlyCO2
    };
  };

  const getEnvironmentalEquivalents = (co2Kg) => {
    return {
      trees: Math.round(co2Kg / 22),
      carKm: Math.round(co2Kg * 2.3)
    };
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>CO2-uitstoot - Energie Dashboard</title>
          <meta name="description" content="CO2-uitstoot analyse en duurzaamheid" />
        </Head>
        <div className="loading">
          <div className="spinner"></div>
          CO2 data laden...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>CO2-uitstoot - Energie Dashboard</title>
          <meta name="description" content="CO2-uitstoot analyse en duurzaamheid" />
        </Head>
        <div className="container">
          <div className="error">
            <h3>Fout bij het laden van CO2 data</h3>
            <p>{error}</p>
            <button className="button" onClick={refreshData}>
              Opnieuw proberen
            </button>
          </div>
        </div>
      </>
    );
  }

  const co2Impact = calculateCO2Impact();
  const equivalents = getEnvironmentalEquivalents(co2Impact.yearly);

  const co2Data = data?.data || [];

  return (
    <>
      <Head>
        <title>CO2-uitstoot - Energie Dashboard</title>
        <meta name="description" content="CO2-uitstoot analyse en duurzaamheid" />
      </Head>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">🌱 CO2-uitstoot</h1>
          <p className="page-subtitle">
            Analyseer je ecologische voetafdruk en duurzaamheid
          </p>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">CO2 Instellingen</h3>
            <div className="chart-controls">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Reductiedoel (%):
                <input
                  type="number"
                  value={targetReduction}
                  onChange={(e) => setTargetReduction(parseFloat(e.target.value) || 0)}
                  className="select-control"
                  style={{ width: '100px' }}
                  min="0"
                  max="100"
                  step="1"
                />
              </label>
              
              <select 
                className="select-control"
                value={selectedPeriod}
                onChange={(e) => handlePeriodChange(e.target.value)}
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
              
              <button className="button" onClick={refreshData}>
                Vernieuwen
              </button>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">
              🌱
            </div>
            <div className="stat-label">Duurzaamheid Status</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Actief bezig
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {co2Impact.total?.toFixed(1) || '0.0'}
            </div>
            <div className="stat-label">Totaal CO2 (kg)</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {co2Impact.daily?.toFixed(2) || '0.00'}
            </div>
            <div className="stat-label">Dagelijks CO2 (kg)</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {co2Impact.yearly?.toFixed(0) || '0'}
            </div>
            <div className="stat-label">Jaarlijks CO2 (kg)</div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🌍 Milieu-impact</h3>
            </div>
            <div>
              <p><strong>Bomen nodig om te compenseren:</strong> {equivalents.trees}</p>
              <p><strong>Auto kilometers equivalent:</strong> {equivalents.carKm} km</p>
              <p><strong>Gemiddelde Nederlander:</strong> ~8,000 kg CO2/jaar</p>
              <p><strong>Jouw uitstoot:</strong> {co2Impact.yearly?.toFixed(0) || '0'} kg CO2/jaar</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">💡 Duurzaamheidstips</h3>
            </div>
            <div>
              <p style={{ color: '#28a745', fontWeight: 'bold' }}>
                🌱 Tips om je CO2-uitstoot te verminderen:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>☀️ Installeer zonnepanelen</li>
                <li style={{ marginBottom: '0.5rem' }}>🌿 Kies voor groene energie</li>
                <li style={{ marginBottom: '0.5rem' }}>🏠 Isoleer je huis</li>
                <li style={{ marginBottom: '0.5rem' }}>🚲 Gebruik duurzaam vervoer</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start'}}>
          <div style={{flex: 1, minWidth: 320}}>
            <EnergyChart data={co2Data} type="doughnut" title="" />
          </div>
          <div style={{flex: 1, minWidth: 320}}>
            <EnergyChart data={co2Data} type="bar" title="" />
          </div>
        </div>
      </div>
    </>
  );
} 