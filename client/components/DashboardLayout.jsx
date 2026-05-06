import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Mic, CloudLightning, Plane, Menu, X, Leaf } from 'lucide-react';

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Maitra AI', path: '/maitra', icon: <Mic size={20} /> },
    { name: 'Ritu-Raksha', path: '/weather', icon: <CloudLightning size={20} /> },
    { name: 'Drone-Link', path: '/drones', icon: <Plane size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-stone-200 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-stone-200">
          <div className="flex items-center space-x-2 text-green-600">
            <Leaf size={24} />
            <span className="text-xl font-bold font-display tracking-tight text-stone-800">PikNode</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-stone-500">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
          {/* TODO (GSSoC Contributor): Add an auth/logout button at the bottom of the sidebar */}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        <header className="h-16 bg-white border-b border-stone-200 flex items-center px-4 lg:px-8 justify-between">
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="lg:hidden text-stone-600 hover:text-stone-900"
          >
            <Menu size={24} />
          </button>
          
          {/* TODO (GSSoC Contributor): Add a language toggle (English/Marathi) here for localization */}
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm font-medium text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
              Pune, MH
            </span>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {/* Outlet is where the nested routes (like Dashboard) will render */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;