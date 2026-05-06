import React from 'react';
import { AlertTriangle, CloudRain, Wind, ThermometerSun } from 'lucide-react';

const WeatherAlerts = () => {
  // Mock data - to be replaced by API
  const alerts = [
    { id: 1, type: 'warning', title: 'Heavy Rainfall Expected', desc: '80% chance of heavy rain tomorrow. Ensure proper drainage in low-lying fields.', icon: <CloudRain /> },
    { id: 2, type: 'info', title: 'Optimal Sowing Temp', desc: 'Soil temperature is ideal for Kharif crops this week.', icon: <ThermometerSun /> },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold font-display text-stone-800">Ritu-Raksha Alerts</h2>
          <p className="text-sm text-stone-500">Predictive environmental insights</p>
        </div>
        <div className="flex space-x-4 text-stone-600">
          <div className="flex items-center"><ThermometerSun size={18} className="mr-1 text-orange-500"/> 32°C</div>
          <div className="flex items-center"><Wind size={18} className="mr-1 text-blue-500"/> 12 km/h</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-xl border flex items-start space-x-4 ${
              alert.type === 'warning' 
                ? 'bg-orange-50 border-orange-200 text-orange-800' 
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            <div className={`p-2 rounded-lg ${alert.type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'}`}>
              {alert.icon}
            </div>
            <div>
              <h3 className="font-bold mb-1">{alert.title}</h3>
              <p className="text-sm opacity-90 leading-relaxed">{alert.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {/* TODO (GSSoC Contributor): Fetch this data dynamically from `GET /api/weather` using a useEffect hook */}
    </div>
  );
};

export default WeatherAlerts;