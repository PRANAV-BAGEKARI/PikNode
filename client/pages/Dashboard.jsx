import React from 'react';
import MaitraWidget from '../components/MaitraWidget';
import WeatherAlerts from '../components/WeatherAlerts';
import DroneStatus from '../components/DroneStatus';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <header>
        <h1 className="text-3xl font-bold text-stone-900 font-display">
          Welcome back, Farmer.
        </h1>
        <p className="text-stone-600 mt-1">Here is the current status of your fields.</p>
        {/* TODO (GSSoC Contributor): Fetch actual user name from context/auth state instead of hardcoding "Farmer" */}
      </header>

      {/* Bento Box Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Maitra spans full width on mobile, 2 columns on large screens */}
        <div className="lg:col-span-2">
          <MaitraWidget />
        </div>

        {/* Drone Status takes 1 column */}
        <div className="lg:col-span-1">
          <DroneStatus />
        </div>

        {/* Weather Alerts spans full width on bottom */}
        <div className="md:col-span-2 lg:col-span-3">
          <WeatherAlerts />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;