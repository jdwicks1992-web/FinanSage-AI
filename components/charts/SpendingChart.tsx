
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import type { BudgetCategory } from '../../types';

interface SpendingChartProps {
  data: BudgetCategory[];
}

const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#64748b' }} fontSize={12} />
          <YAxis tick={{ fill: '#64748b' }} fontSize={12} tickFormatter={(value) => `$${value}`} />
          <Tooltip
            cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
            }}
          />
          <Legend wrapperStyle={{fontSize: "14px"}}/>
          <Bar dataKey="spent" fill="#0ea5e9" name="Spent" radius={[4, 4, 0, 0]} />
          <Bar dataKey="budgeted" fill="#e2e8f0" name="Budgeted" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
