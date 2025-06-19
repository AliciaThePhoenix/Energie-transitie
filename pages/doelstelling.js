import { useState, useEffect } from 'react';
import Head from 'next/head';
// import Navigation from '../components/Navigation'; // Verwijderd
import EnergyChart from '../components/EnergyChart';
import EnergyTable from '../components/EnergyTable';
import useDataFetcher from '../components/DataFetcher';

export default function Doelstelling() {
  const [goals, setGoals] = useState({
    dailyConsumption: 50,
    monthlyCost: 100,
    co2Reduction: 20,
    energyEfficiency: 80
  });

  const { data, loading, error, updateParams, refreshData } = useDataFetcher({
    limit: 168
  });

  useEffect(() => {
    const savedGoals = localStorage.getItem('energy-goals');
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch (e) {
        console.error('Error parsing saved goals:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('energy-goals', JSON.stringify(goals));
  }, [goals]);

  const calculateProgress = () => {
    if (!data?.totals || !data?.data) return {};

    const totalConsumption = data.totals.total_verbruik;
    const totalCost = data.totals.total_kosten;
    
    const daysInData = data.data.length / 24;
    const dailyConsumption = totalConsumption / daysInData;
    const dailyCost = totalCost / daysInData;
    
    const monthlyConsumption = dailyConsumption * 30;
    const monthlyCost = dailyCost * 30;
    
    const consumptionProgress = Math.min((goals.dailyConsumption / dailyConsumption) * 100, 100);
    const costProgress = Math.min((goals.monthlyCost / monthlyCost) * 100, 100);
    
    return {
      dailyConsumption: {
        current: dailyConsumption,
        target: goals.dailyConsumption,
        progress: consumptionProgress,
        status: dailyConsumption <= goals.dailyConsumption ? 'success' : 'warning'
      },
      monthlyCost: {
        current: monthlyCost,
        target: goals.monthlyCost,
        progress: costProgress,
        status: monthlyCost <= goals.monthlyCost ? 'success' : 'warning'
      }
    };
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'success': return '#28a745';
      case 'warning': return '#ffc107';
      case 'danger': return '#dc3545';
      default: return '#17a2b8';
    }
  };

  const getProgressEmoji = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'danger': return '❌';
      default: return '📊';
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Doelstellingen - Energie Dashboard</title>
          <meta name="description" content="Energiebesparing doelstellingen en voortgang" />
        </Head>
        {/* <Navigation /> */}
        <div className="loading">
          <div className="spinner"></div>
          Doelstellingen laden...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Doelstellingen - Energie Dashboard</title>
          <meta name="description" content="Energiebesparing doelstellingen en voortgang" />
        </Head>
        {/* <Navigation /> */}
        <div className="container">
          <div className="error">
            <h3>Fout bij het laden van doelstellingen</h3>
            <p>{error}</p>
            <button className="button" onClick={refreshData}>
              Opnieuw proberen
            </button>
          </div>
        </div>
      </>
    );
  }

  const progress = calculateProgress();

  const goalData = data?.data || [];

  return (
    <>
      <Head>
        <title>Doelstellingen - Energie Dashboard</title>
        <meta name="description" content="Energiebesparing doelstellingen en voortgang" />
      </Head>
      {/* <Navigation /> */}
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">🎯 Doelstellingen</h1>
          <p className="page-subtitle">
            Stel doelen en volg je voortgang in energiebesparing
          </p>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Doelstellingen Instellen</h3>
            <div className="chart-controls">
              <button className="button" onClick={refreshData}>
                Data Vernieuwen
              </button>
            </div>
          </div>
          
          <div className="dashboard-grid">
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Dagelijks verbruik doel (kWh):
              </label>
              <input
                type="number"
                value={goals.dailyConsumption}
                onChange={(e) => setGoals(prev => ({ ...prev, dailyConsumption: parseFloat(e.target.value) || 0 }))}
                className="select-control"
                min="0"
                step="0.1"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Maandelijkse kosten doel (€):
              </label>
              <input
                type="number"
                value={goals.monthlyCost}
                onChange={(e) => setGoals(prev => ({ ...prev, monthlyCost: parseFloat(e.target.value) || 0 }))}
                className="select-control"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                CO2 reductie doel (%):
              </label>
              <input
                type="number"
                value={goals.co2Reduction}
                onChange={(e) => setGoals(prev => ({ ...prev, co2Reduction: parseFloat(e.target.value) || 0 }))}
                className="select-control"
                min="0"
                max="100"
                step="1"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Energie-efficiëntie doel (%):
              </label>
              <input
                type="number"
                value={goals.energyEfficiency}
                onChange={(e) => setGoals(prev => ({ ...prev, energyEfficiency: parseFloat(e.target.value) || 0 }))}
                className="select-control"
                min="0"
                max="100"
                step="1"
              />
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getProgressColor(progress.dailyConsumption?.status) }}>
              {getProgressEmoji(progress.dailyConsumption?.status)}
            </div>
            <div className="stat-label">Dagelijks Verbruik</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              {progress.dailyConsumption?.current?.toFixed(1) || '0.0'} / {progress.dailyConsumption?.target} kWh
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value" style={{ color: getProgressColor(progress.monthlyCost?.status) }}>
              {getProgressEmoji(progress.monthlyCost?.status)}
            </div>
            <div className="stat-label">Maandelijkse Kosten</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              €{progress.monthlyCost?.current?.toFixed(2) || '0.00'} / €{progress.monthlyCost?.target}
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {goals.co2Reduction}%
            </div>
            <div className="stat-label">CO2 Reductie</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Doel voor dit jaar
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {goals.energyEfficiency}%
            </div>
            <div className="stat-label">Energie-efficiëntie</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Doel voor dit jaar
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📊 Voortgang Dagelijks Verbruik</h3>
            </div>
            <div>
              <p><strong>Huidig:</strong> {progress.dailyConsumption?.current?.toFixed(1) || '0.0'} kWh</p>
              <p><strong>Doel:</strong> {progress.dailyConsumption?.target} kWh</p>
              <p><strong>Voortgang:</strong> {progress.dailyConsumption?.progress?.toFixed(1) || '0.0'}%</p>
              
              <div style={{ 
                width: '100%', 
                height: '20px', 
                backgroundColor: '#f0f0f0', 
                borderRadius: '10px', 
                marginTop: '1rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(progress.dailyConsumption?.progress || 0, 100)}%`,
                  height: '100%',
                  backgroundColor: getProgressColor(progress.dailyConsumption?.status),
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">💰 Voortgang Maandelijkse Kosten</h3>
            </div>
            <div>
              <p><strong>Huidig:</strong> €{progress.monthlyCost?.current?.toFixed(2) || '0.00'}</p>
              <p><strong>Doel:</strong> €{progress.monthlyCost?.target}</p>
              <p><strong>Voortgang:</strong> {progress.monthlyCost?.progress?.toFixed(1) || '0.0'}%</p>
              
              <div style={{ 
                width: '100%', 
                height: '20px', 
                backgroundColor: '#f0f0f0', 
                borderRadius: '10px', 
                marginTop: '1rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(progress.monthlyCost?.progress || 0, 100)}%`,
                  height: '100%',
                  backgroundColor: getProgressColor(progress.monthlyCost?.status),
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
          </div>
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start'}}>
          <div style={{flex: 1, minWidth: 320}}>
            <EnergyChart data={goalData} type="line" title="" />
          </div>
          <div style={{flex: 1, minWidth: 320}}>
            <EnergyChart data={goalData} type="doughnut" title="" />
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">💡 Aanbevelingen</h3>
            </div>
            <div>
              {progress.dailyConsumption?.status === 'warning' ? (
                <div>
                  <p style={{ color: '#ffc107', fontWeight: 'bold' }}>
                    ⚠️ Je dagelijkse verbruik is hoger dan je doel!
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>🌡️ Verlaag de thermostaat met 1°C</li>
                    <li style={{ marginBottom: '0.5rem' }}>💡 Vervang gloeilampen door LED</li>
                    <li style={{ marginBottom: '0.5rem' }}>🔌 Gebruik slimme stekkers</li>
                    <li style={{ marginBottom: '0.5rem' }}>🚿 Neem kortere douches</li>
                  </ul>
                </div>
              ) : (
                <div>
                  <p style={{ color: '#28a745', fontWeight: 'bold' }}>
                    ✅ Je bent op weg naar je doel! Blijf zo doorgaan.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>🎯 Stel een ambitieuzer doel</li>
                    <li style={{ marginBottom: '0.5rem' }}>📈 Investeer in energiebesparing</li>
                    <li style={{ marginBottom: '0.5rem' }}>🌱 Overweeg zonnepanelen</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🏆 Prestaties</h3>
            </div>
            <div>
              <p><strong>Gemiddelde score:</strong> {
                ((progress.dailyConsumption?.progress || 0) + (progress.monthlyCost?.progress || 0)) / 2
              }%</p>
              <p><strong>Beste prestaties:</strong> {
                Math.max(progress.dailyConsumption?.progress || 0, progress.monthlyCost?.progress || 0)
              }%</p>
              <p><strong>Verbetering nodig:</strong> {
                Math.min(progress.dailyConsumption?.progress || 0, progress.monthlyCost?.progress || 0)
              }%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 