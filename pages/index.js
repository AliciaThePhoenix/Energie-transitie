import EnergyChart from '../components/EnergyChart';
import useDataFetcher from '../components/DataFetcher';

export default function Home() {
  const { data, loading, error } = useDataFetcher({ limit: 24 });

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (error) return <div className="error">{error}</div>;

  const recentData = data?.data || [];

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start'}}>
      <div style={{flex: 1, minWidth: 320}}>
        <EnergyChart data={recentData} type="doughnut" title="" />
      </div>
      <div style={{flex: 1, minWidth: 320}}>
        <EnergyChart data={recentData} type="line" title="" />
      </div>
    </div>
  );
} 