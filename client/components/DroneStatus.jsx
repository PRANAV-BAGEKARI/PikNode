import React from 'react';
import { Plane, Battery, Activity, Map } from 'lucide-react';

const DroneStatus = () => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-stone-100 text-stone-700 rounded-lg">
          <Plane size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold font-display text-stone-800">Drone-Link</h2>
          <p className="text-sm text-stone-500">UAV Fleet Telemetry</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-stone-600">
            <Activity size={18} className="text-green-500" />
            <span className="font-medium">Status</span>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold animate-pulse">
            Airborne
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-stone-600">
              <Battery size={18} />
              <span>Battery Level</span>
            </div>
            <span className="font-bold text-stone-800">75%</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-stone-100 pt-4">
          <div className="flex items-center space-x-2 text-stone-600">
            <Map size={18} />
            <span className="text-sm">Area Covered</span>
          </div>
          <span className="font-bold text-stone-800">1.2 Acres</span>
        </div>

      </div>
      {/* TODO (GSSoC Contributor): Map the drone coordinates visually using Leaflet.js or Google Maps API here */}
    </div>
  );
};

export default DroneStatus;