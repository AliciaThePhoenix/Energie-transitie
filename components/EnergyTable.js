import { useState, useEffect } from 'react';

export default function EnergyTable({ data, title = 'Energieverbruik Data' }) {
  const [sortField, setSortField] = useState('datum');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const energyTypes = [
    { value: 'all', label: 'Alle types' },
    { value: 'elektriciteit', label: 'Elektriciteit' },
    { value: 'gas', label: 'Gas' }
  ];

  // Sort and filter data
  const processedData = data
    ?.filter(item => {
      if (filterType !== 'all' && item.type !== filterType) return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          item.datum.toLowerCase().includes(searchLower) ||
          item.tijd.toLowerCase().includes(searchLower) ||
          item.type.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle date sorting
      if (sortField === 'datum') {
        aValue = new Date(a.datum + ' ' + a.tijd);
        bValue = new Date(b.datum + ' ' + b.tijd);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }) || [];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatValue = (value, field) => {
    if (field === 'verbruik_kwh') {
      return `${value.toFixed(2)} kWh`;
    }
    if (field === 'kosten_euro') {
      return `€${value.toFixed(2)}`;
    }
    if (field === 'co2_kg') {
      return `${value.toFixed(2)} kg`;
    }
    return value;
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (!data || data.length === 0) {
    return (
      <div className="table-container">
        <div className="loading">
          <div className="spinner"></div>
          Laden...
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <div className="chart-controls">
          <input
            type="text"
            placeholder="Zoeken..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="select-control"
            style={{ minWidth: '200px' }}
          />
          
          <select
            className="select-control"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {energyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          
          <span className="text-center" style={{ color: '#666' }}>
            {processedData.length} van {data.length} records
          </span>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('datum')} style={{ cursor: 'pointer' }}>
              Datum/Tijd {getSortIcon('datum')}
            </th>
            <th onClick={() => handleSort('type')} style={{ cursor: 'pointer' }}>
              Type {getSortIcon('type')}
            </th>
            <th onClick={() => handleSort('verbruik_kwh')} style={{ cursor: 'pointer' }}>
              Verbruik {getSortIcon('verbruik_kwh')}
            </th>
            <th onClick={() => handleSort('kosten_euro')} style={{ cursor: 'pointer' }}>
              Kosten {getSortIcon('kosten_euro')}
            </th>
            <th onClick={() => handleSort('co2_kg')} style={{ cursor: 'pointer' }}>
              CO2 {getSortIcon('co2_kg')}
            </th>
          </tr>
        </thead>
        <tbody>
          {processedData.slice(0, 50).map((item, index) => (
            <tr key={index}>
              <td>{item.datum} {item.tijd}</td>
              <td>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  backgroundColor: item.type === 'elektriciteit' 
                    ? 'rgba(102, 126, 234, 0.1)' 
                    : 'rgba(255, 99, 132, 0.1)',
                  color: item.type === 'elektriciteit' 
                    ? '#667eea' 
                    : '#ff6384'
                }}>
                  {item.type}
                </span>
              </td>
              <td>{formatValue(item.verbruik_kwh, 'verbruik_kwh')}</td>
              <td>{formatValue(item.kosten_euro, 'kosten_euro')}</td>
              <td>{formatValue(item.co2_kg, 'co2_kg')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {processedData.length > 50 && (
        <div className="text-center mt-2" style={{ color: '#666' }}>
          Toon eerste 50 records van {processedData.length} totaal
        </div>
      )}
    </div>
  );
} 