import { useState } from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import EnergyChart from '../components/EnergyChart';
import EnergyTable from '../components/EnergyTable';
import useDataFetcher from '../components/DataFetcher';

export default function Historisch() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedType, setSelectedType] = useState('all');
  
  const { data, loading, error, updateParams, refreshData } = useDataFetcher({
    limit: 168 // 7 days * 24 hours
  });

  const periods = [
    { value: '24h', label: 'Laatste 24 uur' },
    { value: '7d', label: 'Laatste 7 dagen' },
    { value: '30d', label: 'Laatste 30 dagen' }
  ];

  const energyTypes = [
    { value: 'all', label: 'Alle energie' },
    { value: 'elektriciteit', label: 'Elektriciteit' },
    { value: 'gas', label: 'Gas' }
  ];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    const limits = { '24h': 24, '7d': 168, '30d': 720 };
    updateParams({ limit: limits[period] });
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    updateParams({ type: type === 'all' ? undefined : type });
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Historisch Verbruik - Energie Dashboard</title>
          <meta name="description" content="Historisch overzicht van energieverbruik" />
        </Head>
        <Navigation />
        <div className="loading">
          <div className="spinner"></div>
          Historische data laden...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Historisch Verbruik - Energie Dashboard</title>
          <meta name="description" content="Historisch overzicht van energieverbruik" />
        </Head>
        <Navigation />
        <div className="container">
          <div className="error">
            <h3>Fout bij het laden van historische data</h3>
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
  const historicalData = data?.data || [];
  const dailyData = data?.dailyData || [];

  // Calculate averages
  const avgConsumption = historicalData.length > 0 
    ? totals.total_verbruik / historicalData.length 
    : 0;
  
  const avgCost = historicalData.length > 0 
    ? totals.total_kosten / historicalData.length 
    : 0;

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start'}}>
      <div style={{flex: 1, minWidth: 320}}>
        <EnergyChart data={historicalData} type="line" title="" />
      </div>
      <div style={{flex: 1, minWidth: 320}}>
        <EnergyChart data={historicalData} type="bar" title="" />
      </div>
    </div>
  );
} 