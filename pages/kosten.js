import { useState } from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import EnergyChart from '../components/EnergyChart';
import EnergyTable from '../components/EnergyTable';
import useDataFetcher from '../components/DataFetcher';

export default function Kosten() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [budget, setBudget] = useState(50);
  
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

  const calculateCostBreakdown = () => {
    if (!data?.data) return { elektriciteit: 0, gas: 0 };
    
    return data.data.reduce((acc, item) => {
      if (item.type === 'elektriciteit') {
        acc.elektriciteit += item.kosten_euro || 0;
      } else if (item.type === 'gas') {
        acc.gas += item.kosten_euro || 0;
      }
      return acc;
    }, { elektriciteit: 0, gas: 0 });
  };

  const calculateProjectedMonthlyCost = () => {
    if (!data?.totals) return 0;
    
    const daysInPeriod = selectedPeriod === '24h' ? 1 : selectedPeriod === '7d' ? 7 : 30;
    const dailyCost = data.totals.total_kosten / daysInPeriod;
    return dailyCost * 30;
  };

  const getBudgetStatus = () => {
    const projected = calculateProjectedMonthlyCost();
    const percentage = (projected / budget) * 100;
    
    if (percentage > 100) return { status: 'Overschreden', color: '#dc3545' };
    if (percentage > 80) return { status: 'Hoog', color: '#ffc107' };
    return { status: 'Normaal', color: '#28a745' };
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Kostenoverzicht - Energie Dashboard</title>
          <meta name="description" content="Overzicht van energiekosten" />
        </Head>
        <Navigation />
        <div className="loading">
          <div className="spinner"></div>
          Kostenoverzicht laden...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Kostenoverzicht - Energie Dashboard</title>
          <meta name="description" content="Overzicht van energiekosten" />
        </Head>
        <Navigation />
        <div className="container">
          <div className="error">
            <h3>Fout bij het laden van kostenoverzicht</h3>
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
  const costData = data?.data || [];
  const costBreakdown = calculateCostBreakdown();
  const projectedMonthly = calculateProjectedMonthlyCost();
  const budgetStatus = getBudgetStatus();

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start'}}>
      <div style={{flex: 1, minWidth: 320}}>
        <EnergyChart data={costData} type="bar" title="" />
      </div>
      <div style={{flex: 1, minWidth: 320}}>
        <EnergyChart data={costData} type="line" title="" />
      </div>
    </div>
  );
} 