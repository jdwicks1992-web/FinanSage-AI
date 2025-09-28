
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 4300 },
  { name: 'Mar', value: 4200 },
  { name: 'Apr', value: 4800 },
  { name: 'May', value: 5100 },
  { name: 'Jun', value: 5300 },
  { name: 'Jul', value: 5500 },
];

const InvestmentChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#64748b' }} fontSize={12} />
          <YAxis tick={{ fill: '#64748b' }} fontSize={12} tickFormatter={(value) => `$${value}`} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
            }}
          />
          <Area type="monotone" dataKey="value" stroke="#0284c7" fill="url(#colorValue)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;
