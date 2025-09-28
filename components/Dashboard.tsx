import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useMockData } from '../hooks/useMockData';
import SpendingChart from './charts/SpendingChart';
import { getFinancialAdvice } from '../services/geminiService';
import type { View, Transaction } from '../types';

interface DashboardProps {
    setView: (view: View) => void;
    isBankConnected: boolean;
}

const StatCard: React.FC<{ icon: string; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <Card className="flex items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            <i className={`fas ${icon} text-white text-xl`}></i>
        </div>
        <div className="ml-4">
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </Card>
);

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
        <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                <i className={`fas ${transaction.type === 'income' ? 'fa-arrow-up text-emerald-500' : 'fa-arrow-down text-rose-500'}`}></i>
            </div>
            <div className="ml-3">
                <p className="font-semibold text-slate-700">{transaction.description}</p>
                <p className="text-sm text-slate-500">{transaction.date} &bull; {transaction.category}</p>
            </div>
        </div>
        <p className={`font-bold ${transaction.type === 'income' ? 'text-emerald-500' : 'text-slate-800'}`}>
            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
        </p>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ setView, isBankConnected }) => {
    const data = useMockData();
    const [insight, setInsight] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchInsight = async () => {
        setIsLoading(true);
        const prompt = "Provide a single, concise financial insight or tip based on my dashboard summary.";
        const result = await getFinancialAdvice(prompt, data);
        setInsight(result);
        setIsLoading(false);
    };
    
    useEffect(() => {
        fetchInsight();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-6">
            {!isBankConnected && (
                 <Card className="bg-sky-100 border border-sky-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center text-center md:text-left">
                            <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex-shrink-0 items-center justify-center hidden md:flex">
                                <i className="fas fa-university text-xl"></i>
                            </div>
                            <div className="md:ml-4">
                                <h3 className="font-bold text-lg text-sky-800">Connect Your Bank Account</h3>
                                <p className="text-sky-700 mt-1">Get a real-time view of your finances by linking your bank account securely.</p>
                            </div>
                        </div>
                        <button onClick={() => setView('connect-bank')} className="bg-sky-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-sky-600 transition-colors flex-shrink-0 w-full md:w-auto">
                            Connect Now
                        </button>
                    </div>
                </Card>
            )}

            <h2 className="text-3xl font-bold text-slate-800">Welcome back, Alex!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon="fa-dollar-sign" title="Total Balance" value={`$${data.summary.totalBalance.toLocaleString()}`} color="bg-sky-500" />
                <StatCard icon="fa-shopping-cart" title="Monthly Spending" value={`$${data.summary.monthlyExpenses.toLocaleString()}`} color="bg-amber-500" />
                <StatCard icon="fa-chart-pie" title="Investments" value={`$${data.summary.totalInvestments.toLocaleString()}`} color="bg-indigo-500" />
                <StatCard icon="fa-piggy-bank" title="Total Savings" value={`$${data.summary.totalSavings.toLocaleString()}`} color="bg-emerald-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2" title="Monthly Spending Breakdown">
                    <SpendingChart data={data.budgetCategories} />
                </Card>
                <Card title="AI Quick Insight">
                    <div className="h-full flex flex-col justify-between">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <i className="fas fa-spinner fa-spin text-sky-500 text-3xl"></i>
                            </div>
                        ) : (
                            <p className="text-slate-600 leading-relaxed">{insight}</p>
                        )}
                        <button onClick={() => setView('ai-assistant')} className="mt-4 w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
                            Ask AI Assistant
                        </button>
                    </div>
                </Card>
            </div>

            <Card title="Recent Transactions">
                {data.transactions.slice(0, 5).map(tx => <TransactionRow key={tx.id} transaction={tx} />)}
            </Card>
        </div>
    );
};

export default Dashboard;