# ⚡ Energie Dashboard

Een moderne, interactieve energieverbruik dashboard gebouwd met Next.js, React en Chart.js. Het dashboard biedt real-time monitoring, historische analyse en duurzaamheidsinzichten voor je energieverbruik.

## 🌟 Functies

### 📊 Dashboard Pagina's
- **Home** - Overzicht met key metrics en snelle acties
- **Historisch Verbruik** - Gedetailleerde analyse van energieverbruik over tijd
- **Realtime Verbruik** - Live monitoring met auto-refresh functionaliteit
- **Kostenoverzicht** - Budget tracking en kostenanalyse
- **Doelstelling** - Energiebesparing doelen en voortgang
- **CO2-uitstoot** - Duurzaamheidsanalyse en milieu-impact

### 🎛️ Interactieve Functies
- **Grafieken aanpassen** - Lijn, staaf en cirkel grafieken
- **Data filteren** - Per type (elektriciteit/gas), tijd en periode
- **Instellingen opslaan** - Cookies/cache voor gebruikersvoorkeuren
- **Responsive design** - Werkt op desktop, tablet en mobiel

### 📈 Data Visualisatie
- Real-time grafieken met Chart.js
- Interactieve tabellen met sortering en zoeken
- Voortgangsbalken voor doelen
- Milieu-impact equivalenten

## 🚀 Installatie

### Vereisten
- Node.js 16+ 
- npm of yarn

### Stappen
1. **Clone het project**
   ```bash
   git clone <repository-url>
   cd my-energy-dashboard
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Start de development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structuur

```
my-energy-dashboard/
├── data/
│   └── energy.csv          # CSV-bestand met verbruik data
├── pages/
│   ├── index.js            # Home pagina
│   ├── historisch.js       # Historisch verbruik
│   ├── realtime.js         # Realtime monitoring
│   ├── kosten.js           # Kostenoverzicht
│   ├── doelstelling.js     # Doelstellingen
│   ├── co2.js              # CO2-uitstoot
│   └── api/
│       └── data.js         # API voor CSV data
├── components/
│   ├── Navigation.js       # Navigatie component
│   ├── EnergyChart.js      # Grafiek component
│   ├── EnergyTable.js      # Tabel component
│   └── DataFetcher.js      # Data ophaal utility
├── styles/
│   └── globals.css         # CSS styling
├── package.json
└── README.md
```

## 📊 Data Format

Het dashboard gebruikt een CSV-bestand met de volgende kolommen:

```csv
datum,tijd,verbruik_kwh,kosten_euro,co2_kg,type
2024-01-01,00:00,2.3,0.46,1.15,elektriciteit
2024-01-01,01:00,1.8,0.36,0.90,elektriciteit
```

### Kolommen
- `datum` - Datum (YYYY-MM-DD)
- `tijd` - Tijd (HH:MM)
- `verbruik_kwh` - Energieverbruik in kWh
- `kosten_euro` - Kosten in euro's
- `co2_kg` - CO2-uitstoot in kg
- `type` - Type energie (elektriciteit/gas)

## 🎯 Gebruik

### Navigatie
- Gebruik de navigatiebalk bovenaan om tussen pagina's te wisselen
- Elke pagina heeft specifieke functies en visualisaties

### Grafieken Aanpassen
- Kies tussen lijn, staaf of cirkel grafieken
- Filter op tijdperiode (24h, 7d, 30d)
- Selecteer energie type (alle, elektriciteit, gas)

### Instellingen
- Doelstellingen worden automatisch opgeslagen
- Grafiek voorkeuren worden bewaard
- Budget instellingen blijven behouden

### Data Vernieuwen
- Gebruik de "Vernieuwen" knop voor nieuwe data
- Realtime pagina heeft auto-refresh optie
- Data wordt opgehaald uit het CSV-bestand

## 🔧 Technische Details

### Tech Stack
- **Frontend**: Next.js, React, Chart.js
- **Styling**: CSS3 met moderne features
- **Data**: CSV parsing met PapaParse
- **State**: React hooks en localStorage
- **Charts**: react-chartjs-2

### API Endpoints
- `GET /api/data` - Haalt CSV data op met filtering opties
- Query parameters: `type`, `date`, `limit`

### Browser Ondersteuning
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Customization

### Styling Aanpassen
- Bewerk `styles/globals.css` voor kleuren en layout
- CSS variabelen voor consistente theming
- Responsive breakpoints voor verschillende schermen

### Data Bron Wijzigen
- Vervang `data/energy.csv` met je eigen data
- Pas API endpoint aan in `pages/api/data.js`
- Update data format indien nodig

### Nieuwe Grafieken
- Voeg chart types toe in `components/EnergyChart.js`
- Gebruik Chart.js plugins voor extra functionaliteit
- Implementeer custom visualisaties

## 📱 Responsive Design

Het dashboard is volledig responsive:
- **Desktop**: Volledige functionaliteit met zijbalken
- **Tablet**: Geoptimaliseerde layout voor touch
- **Mobiel**: Gestapelde layout met touch-vriendelijke knoppen

## 🔒 Privacy & Data

- Alle data wordt lokaal opgeslagen
- Geen externe tracking of analytics
- Instellingen worden in browser cookies opgeslagen
- CSV data blijft op je eigen server

## 🚀 Deployment

### Vercel (Aanbevolen)
```bash
npm run build
vercel --prod
```

### Andere Platforms
```bash
npm run build
npm start
```

## 🤝 Bijdragen

1. Fork het project
2. Maak een feature branch
3. Commit je wijzigingen
4. Push naar de branch
5. Open een Pull Request

## 📄 Licentie

MIT License - zie LICENSE bestand voor details

## 🆘 Support

Voor vragen of problemen:
1. Check de documentatie
2. Zoek in bestaande issues
3. Maak een nieuwe issue aan

## 🔮 Toekomstige Features

- [ ] Export functionaliteit (PDF, Excel)
- [ ] Notificaties en alerts
- [ ] Machine learning voorspellingen
- [ ] Integratie met slimme meters
- [ ] Multi-gebruiker ondersteuning
- [ ] Dark mode thema

---

**Gemaakt met ❤️ voor duurzame energie monitoring** 