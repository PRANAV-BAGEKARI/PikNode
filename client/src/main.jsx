import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main Application Layout */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Default page inside the layout is the Dashboard */}
          <Route index element={<Dashboard />} />
          
          {/* TODO (GSSoC Contributor): Add dedicated routes for /maitra, /weather, and /drones here */}
        </Route>

        {/* Catch-all route: redirects unknown URLs back to the dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);