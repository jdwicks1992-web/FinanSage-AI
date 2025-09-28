
import { useState, useMemo } from 'react';
import type { Transaction, Investment, SavingsGoal, BudgetCategory } from '../types';

export interface FinancialData {
  transactions: Transaction[];
  investments: Investment[];
  savingsGoals: SavingsGoal[];
  budgetCategories: BudgetCategory[];
  summary: {
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    totalInvestments: number;
    totalSavings: number;
  };
}

const generateMockData = (): FinancialData => {
  const transactions: Transaction[] = [
    { id: '1', date: '2024-07-28', description: 'Monthly Salary', category: 'Income', amount: 5000, type: 'income' },
    { id: '2', date: '2024-07-27', description: 'Groceries at Whole Foods', category: 'Food', amount: 154.32, type: 'expense' },
    { id: '3', date: '2024-07-26', description: 'Netflix Subscription', category: 'Entertainment', amount: 15.99, type: 'expense' },
    { id: '4', date: '2024-07-25', description: 'Gasoline', category: 'Transport', amount: 45.50, type: 'expense' },
    { id: '5', date: '2024-07-24', description: 'Dinner with friends', category: 'Food', amount: 88.00, type: 'expense' },
    { id: '6', date: '2024-07-22', description: 'Rent Payment', category: 'Housing', amount: 1800, type: 'expense' },
    { id: '7', date: '2024-07-20', description: 'Stock Dividend', category: 'Income', amount: 75.50, type: 'income' },
    { id: '8', date: '2024-07-18', description: 'New Running Shoes', category: 'Shopping', amount: 129.99, type: 'expense' },
    { id: '9', date: '2024-07-15', description: 'Internet Bill', category: 'Utilities', amount: 65.00, type: 'expense' },
    { id: '10', date: '2024-07-12', description: 'Coffee Shop', category: 'Food', amount: 5.75, type: 'expense' },
  ];

  const investments: Investment[] = [
    { id: '1', name: 'Tech Giant Inc.', symbol: 'TECH', shares: 10, price: 350.75, changePercent: 1.25 },
    { id: '2', name: 'Green Energy ETF', symbol: 'GRN', shares: 50, price: 75.50, changePercent: -0.50 },
    { id: '3', name: 'Global Health Fund', symbol: 'HLTH', shares: 25, price: 120.00, changePercent: 2.10 },
    { id: '4', name: 'Crypto Coin', symbol: 'CRYP', shares: 100, price: 45.20, changePercent: -3.45 },
  ];

  const savingsGoals: SavingsGoal[] = [
    { id: '1', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 7500, emoji: '🛡️' },
    { id: '2', name: 'Vacation to Japan', targetAmount: 8000, currentAmount: 3200, emoji: '🏯' },
    { id: '3', name: 'New Car Down Payment', targetAmount: 5000, currentAmount: 4800, emoji: '🚗' },
  ];
  
  const budgetCategories: BudgetCategory[] = [
    { name: 'Food', budgeted: 500, spent: 248.07 },
    { name: 'Transport', budgeted: 150, spent: 45.50 },
    { name: 'Entertainment', budgeted: 100, spent: 15.99 },
    { name: 'Shopping', budgeted: 250, spent: 129.99 },
    { name: 'Housing', budgeted: 1800, spent: 1800 },
    { name: 'Utilities', budgeted: 150, spent: 65.00 },
  ];

  const monthlyIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const totalInvestments = investments.reduce((sum, i) => sum + (i.shares * i.price), 0);
  const totalSavings = savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalBalance = monthlyIncome - monthlyExpenses + totalSavings + 5000; // Assume a starting balance

  return {
    transactions,
    investments,
    savingsGoals,
    budgetCategories,
    summary: {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      totalInvestments,
      totalSavings,
    }
  };
};

export const useMockData = () => {
    const [data] = useState(() => generateMockData());
    return useMemo(() => data, [data]);
};

