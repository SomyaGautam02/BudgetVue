import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import './SidebarChart.css';

const VerticalBarChart = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return <div>No expense data available</div>;
  }

  // Group and sum expenses by category
  const groupedExpenses = expenses.reduce((result, expense) => {
    const existingExpense = result.find((item) => item.name === expense.category);
    if (existingExpense) {
      existingExpense.value += expense.amount;
    } else {
      result.push({ name: expense.category, value: expense.amount });
    }
    return result;
  }, []);

  const totalExpense = groupedExpenses.reduce((acc, expense) => acc + expense.value, 0);

  return (
    <div style={{ width: 360, height: 250 }} className='expense_bar_graph'>
      <ResponsiveContainer>
        <BarChart data={groupedExpenses} layout="vertical" className='expense-vertical'>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="value" fill="blue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarChart;
