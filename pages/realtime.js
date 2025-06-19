import { useState, useEffect } from 'react';
import Head from 'next/head';
// import Navigation from '../components/Navigation'; // Verwijderd
import EnergyChart from '../components/EnergyChart';
import EnergyTable from '../components/EnergyTable';
import useDataFetcher from '../components/DataFetcher';

export default function Realtime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  
  const { data, loading, error, updateParams, refreshData } = useDataFetcher({
    limit: 24
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      refreshData();
    }, refreshInterval * 1000);
    
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refreshData]);

  const intervals = [
    { value: 10, label: '10 seconden' },
    { value: 30, label: '30 seconden' },
    { value: 60, label: '1 minuut' },
    { value: 300, label: '5 minuten' }
  ];

  const getCurrentStatus = () => {
    if (!data?.data || data.data.length === 0) return 'Geen data';
    
    const latest = data.data[0];
    const consumption = latest.verbruik_kwh;
    
    if (consumption > 5) return 'Hoog verbruik';
    if (consumption > 2) return 'Normaal verbruik';
    return 'Laag verbruik';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hoog verbruik': return '#dc3545';
      case 'Normaal verbruik': return '#ffc107';
      case 'Laag verbruik': return '#28a745';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Realtime Verbruik - Energie Dashboard</title>
          <meta name="description" content="Realtime monitoring van energieverbruik" />
        </Head>
        {/* <Navigation /> */}
        <div className="loading">
          <div className="spinner"></div>
          Realtime data laden...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Realtime Verbruik - Energie Dashboard</title>
          <meta name="description" content="Realtime monitoring van energieverbruik" />
        </Head>
        {/* <Navigation /> */}
        <div className="container">
          <div className="error">
            <h3>Fout bij het laden van realtime data</h3>
            <p>{error}</p>
            <button className="button" onClick={refreshData}>
              Opnieuw proberen
            </button>
          </div>
        </div>
      </>
    );
  }

  const totals = data?.totals || {};
  const realtimeData = data?.data || [];
  const currentStatus = getCurrentStatus();
  const latestData = realtimeData[0];

  return (
    <>
      <Head>
        <title>Realtime Verbruik - Energie Dashboard</title>
        <meta name="description" content="Realtime monitoring van energieverbruik" />
      </Head>
      {/* <Navigation /> */}
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">⚡ Realtime Verbruik</h1>
          <p className="page-subtitle">
            Live monitoring van je energieverbruik
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Laatste update: {currentTime.toLocaleString('nl-NL')}
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getStatusColor(currentStatus) }}>
              {currentStatus}
            </div>
            <div className="stat-label">Huidige Status</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {latestData?.verbruik_kwh?.toFixed(2) || '0.00'}
            </div>
            <div className="stat-label">Laatste Meting (kWh)</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              €{latestData?.kosten_euro?.toFixed(2) || '0.00'}
            </div>
            <div className="stat-label">Laatste Kosten</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {latestData?.co2_kg?.toFixed(2) || '0.00'}
            </div>
            <div className="stat-label">CO2 Uitstoot (kg)</div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Realtime Instellingen</h3>
            <div className="chart-controls">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                Auto-refresh
              </label>
              
              <select 
                className="select-control"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                disabled={!autoRefresh}
              >
                {intervals.map(interval => (
                  <option key={interval.value} value={interval.value}>
                    {interval.label}
                  </option>
                ))}
              </select>
              
              <button className="button" onClick={refreshData}>
                Nu Vernieuwen
              </button>
            </div>
          </div>
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start'}}>
          <div style={{flex: 1, minWidth: 320}}>
            <EnergyChart data={realtimeData} type="line" title="" />
          </div>
          <div style={{flex: 1, minWidth: 320}}>
            <EnergyChart data={realtimeData} type="bar" title="" />
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">⚠️ Waarschuwingen</h3>
            </div>
            <div>
              {latestData?.verbruik_kwh > 5 ? (
                <div style={{ color: '#dc3545', fontWeight: 'bold' }}>
                  ⚠️ Hoog verbruik gedetecteerd! Overweeg om apparaten uit te zetten.
                </div>
              ) : (
                <div style={{ color: '#28a745' }}>
                  ✅ Verbruik binnen normale grenzen
                </div>
              )}
              
              {totals.total_kosten > 10 && (
                <div style={{ color: '#ffc107', marginTop: '1rem' }}>
                  💰 Vandaag al €{totals.total_kosten.toFixed(2)} uitgegeven aan energie
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🎯 Besparingstips</h3>
            </div>
            <div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>💡 Controleer standby apparaten</li>
                <li style={{ marginBottom: '0.5rem' }}>🌡️ Optimaliseer verwarming</li>
                <li style={{ marginBottom: '0.5rem' }}>🔌 Gebruik slimme stekkers</li>
                <li style={{ marginBottom: '0.5rem' }}>📱 Monitor via app</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 