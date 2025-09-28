import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import Investments from './components/Investments';
import Savings from './components/Savings';
import AIAssistant from './components/AIAssistant';
import ConnectBank from './components/ConnectBank';
import type { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isBankConnected, setIsBankConnected] = useState<boolean>(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setView={setCurrentView} isBankConnected={isBankConnected} />;
      case 'budget':
        return <Budget />;
      case 'investments':
        return <Investments />;
      case 'savings':
        return <Savings />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'connect-bank':
        return <ConnectBank onConnected={() => {
            setIsBankConnected(true);
            setCurrentView('dashboard');
        }} />;
      default:
        return <Dashboard setView={setCurrentView} isBankConnected={isBankConnected} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;