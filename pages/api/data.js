import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // CSV bestand inlezen
    const csvFilePath = path.join(process.cwd(), 'data', 'energy.csv');
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
    
    // CSV parsen naar JSON
    const { data, errors } = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true
    });

    if (errors.length > 0) {
      console.error('CSV parsing errors:', errors);
    }

    // Query parameters voor filtering
    const { type, date, limit } = req.query;
    
    let filteredData = data;

    // Filter op type (elektriciteit/gas)
    if (type && type !== 'all') {
      filteredData = filteredData.filter(row => row.type === type);
    }

    // Filter op datum
    if (date) {
      filteredData = filteredData.filter(row => row.datum === date);
    }

    // Limiteer aantal resultaten
    if (limit) {
      filteredData = filteredData.slice(0, parseInt(limit));
    }

    // Bereken totalen
    const totals = {
      total_verbruik: filteredData.reduce((sum, row) => sum + (row.verbruik_kwh || 0), 0),
      total_kosten: filteredData.reduce((sum, row) => sum + (row.kosten_euro || 0), 0),
      total_co2: filteredData.reduce((sum, row) => sum + (row.co2_kg || 0), 0)
    };

    // Groepeer data per dag voor dagelijkse totalen
    const dailyData = filteredData.reduce((acc, row) => {
      const date = row.datum;
      if (!acc[date]) {
        acc[date] = {
          datum: date,
          verbruik_kwh: 0,
          kosten_euro: 0,
          co2_kg: 0,
          elektriciteit: 0,
          gas: 0
        };
      }
      acc[date].verbruik_kwh += row.verbruik_kwh || 0;
      acc[date].kosten_euro += row.kosten_euro || 0;
      acc[date].co2_kg += row.co2_kg || 0;
      
      if (row.type === 'elektriciteit') {
        acc[date].elektriciteit += row.verbruik_kwh || 0;
      } else if (row.type === 'gas') {
        acc[date].gas += row.verbruik_kwh || 0;
      }
      
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: filteredData,
      dailyData: Object.values(dailyData),
      totals,
      count: filteredData.length
    });

  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error reading data file',
      error: error.message 
    });
  }
} 