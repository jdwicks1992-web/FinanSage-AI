import React from 'react';
import type { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavItem: React.FC<{
  viewName: View;
  currentView: View;
  setView: (view: View) => void;
  iconClass: string;
  label: string;
}> = ({ viewName, currentView, setView, iconClass, label }) => {
  const isActive = currentView === viewName;
  return (
    <li
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive ? 'bg-sky-500 text-white shadow-md' : 'text-slate-600 hover:bg-sky-100 hover:text-sky-700'
      }`}
      onClick={() => setView(viewName)}
    >
      <i className={`fas ${iconClass} w-6 text-center`}></i>
      <span className="ml-4 font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col p-4">
      <div className="flex items-center mb-8">
        <i className="fas fa-seedling text-3xl text-sky-600"></i>
        <h1 className="text-2xl font-bold text-slate-800 ml-3">FinanSage AI</h1>
      </div>
      <nav>
        <ul>
          <NavItem viewName="dashboard" currentView={currentView} setView={setView} iconClass="fa-tachometer-alt" label="Dashboard" />
          <NavItem viewName="budget" currentView={currentView} setView={setView} iconClass="fa-wallet" label="Budget" />
          <NavItem viewName="investments" currentView={currentView} setView={setView} iconClass="fa-chart-line" label="Investments" />
          <NavItem viewName="savings" currentView={currentView} setView={setView} iconClass="fa-piggy-bank" label="Savings Goals" />
          <NavItem viewName="ai-assistant" currentView={currentView} setView={setView} iconClass="fa-robot" label="AI Assistant" />
          <div className="my-2 border-t border-slate-200"></div>
          <NavItem viewName="connect-bank" currentView={currentView} setView={setView} iconClass="fa-university" label="Connect Bank" />
        </ul>
      </nav>
      <div className="mt-auto p-4 bg-slate-100 rounded-lg text-center">
        <p className="text-sm text-slate-600">Upgrade to Pro</p>
        <p className="text-xs text-slate-500 mt-1">Unlock advanced AI insights and portfolio analysis.</p>
        <button className="mt-3 w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default Sidebar;