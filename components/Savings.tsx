
import React from 'react';
import Card from './Card';
import { useMockData } from '../hooks/useMockData';
import type { SavingsGoal } from '../types';

const GoalCard: React.FC<{ goal: SavingsGoal }> = ({ goal }) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;

    return (
        <Card>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-4xl mb-2">{goal.emoji}</p>
                    <h4 className="text-lg font-bold text-slate-800">{goal.name}</h4>
                </div>
                <p className="text-sm font-semibold bg-sky-100 text-sky-700 py-1 px-3 rounded-full">{Math.round(progress)}%</p>
            </div>
            <div className="mt-4">
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div 
                        className="bg-sky-500 h-2.5 rounded-full" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-sm mt-2 text-slate-500">
                    <span>${goal.currentAmount.toLocaleString()}</span>
                    <span>${goal.targetAmount.toLocaleString()}</span>
                </div>
            </div>
        </Card>
    );
};

const Savings: React.FC = () => {
    const data = useMockData();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-800">Savings Goals</h2>
                <button className="bg-emerald-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
                    <i className="fas fa-plus mr-2"></i>New Goal
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.savingsGoals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
            </div>
        </div>
    );
};

export default Savings;
