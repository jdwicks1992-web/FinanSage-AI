
import React from 'react';
import Card from './Card';
import { useMockData } from '../hooks/useMockData';
import InvestmentChart from './charts/InvestmentChart';
import type { Investment } from '../types';

const InvestmentRow: React.FC<{ investment: Investment }> = ({ investment }) => {
    const totalValue = investment.shares * investment.price;
    const changeColor = investment.changePercent >= 0 ? 'text-emerald-500' : 'text-rose-500';
    const changeIcon = investment.changePercent >= 0 ? 'fa-caret-up' : 'fa-caret-down';

    return (
        <div className="grid grid-cols-5 gap-4 items-center py-3 border-b border-slate-100 last:border-b-0">
            <div className="col-span-2">
                <p className="font-bold text-slate-800">{investment.name}</p>
                <p className="text-sm text-slate-500">{investment.symbol}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-slate-700">{investment.shares}</p>
                <p className="text-sm text-slate-500">Shares</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-slate-700">${investment.price.toFixed(2)}</p>
                <p className="text-sm text-slate-500">Price</p>
            </div>
            <div className="text-right">
                <p className="font-bold text-slate-800">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className={`text-sm font-semibold ${changeColor}`}>
                    <i className={`fas ${changeIcon} mr-1`}></i>
                    {investment.changePercent.toFixed(2)}%
                </p>
            </div>
        </div>
    );
}

const Investments: React.FC = () => {
    const data = useMockData();
    
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">My Investments</h2>
            
            <Card>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-500">Total Portfolio Value</p>
                        <p className="text-4xl font-bold text-slate-800">${data.summary.totalInvestments.toLocaleString()}</p>
                        <p className="text-emerald-500 font-semibold mt-1">+ $1,250.30 (2.35%) Today</p>
                    </div>
                    <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 transition-colors">
                        Add Investment
                    </button>
                </div>
            </Card>

            <Card title="Portfolio Performance">
                <InvestmentChart />
            </Card>
            
            <Card title="Holdings">
                <div className="grid grid-cols-5 gap-4 text-sm font-semibold text-slate-500 pb-2 border-b-2 border-slate-200">
                    <div className="col-span-2">Asset</div>
                    <div className="text-right">Quantity</div>
                    <div className="text-right">Price</div>
                    <div className="text-right">Value</div>
                </div>
                {data.investments.map(inv => <InvestmentRow key={inv.id} investment={inv} />)}
            </Card>
        </div>
    );
};

export default Investments;
