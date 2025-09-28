
import React from 'react';
import Card from './Card';
import { useMockData } from '../hooks/useMockData';
import type { BudgetCategory, Transaction } from '../types';

const BudgetRow: React.FC<{ category: BudgetCategory }> = ({ category }) => {
    const progress = (category.spent / category.budgeted) * 100;
    const isOverBudget = progress > 100;
    const progressBarColor = isOverBudget ? 'bg-rose-500' : 'bg-sky-500';

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-700">{category.name}</span>
                <span className={`text-sm ${isOverBudget ? 'text-rose-500 font-bold' : 'text-slate-500'}`}>
                    ${category.spent.toFixed(2)} / ${category.budgeted.toFixed(2)}
                </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div 
                    className={`${progressBarColor} h-2.5 rounded-full`} 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
            </div>
        </div>
    );
};

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
        <div className="flex items-center">
            <div className="ml-3">
                <p className="font-semibold text-slate-700">{transaction.description}</p>
                <p className="text-sm text-slate-500">{transaction.date} &bull; {transaction.category}</p>
            </div>
        </div>
        <p className="font-bold text-rose-500">
            -${transaction.amount.toFixed(2)}
        </p>
    </div>
);


const Budget: React.FC = () => {
    const data = useMockData();
    const totalBudgeted = data.budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
    const totalSpent = data.budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">My Budget</h2>
            
            <Card>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-slate-500">Total Spent this Month</p>
                        <p className="text-4xl font-bold text-slate-800">${totalSpent.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-500">Total Budget</p>
                        <p className="text-2xl font-semibold text-slate-600">${totalBudgeted.toLocaleString()}</p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Budget Categories">
                    {data.budgetCategories.map(cat => <BudgetRow key={cat.name} category={cat} />)}
                </Card>
                <Card title="All Expenses">
                    <div className="max-h-96 overflow-y-auto">
                        {data.transactions.filter(t => t.type === 'expense').map(tx => <TransactionRow key={tx.id} transaction={tx} />)}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Budget;
