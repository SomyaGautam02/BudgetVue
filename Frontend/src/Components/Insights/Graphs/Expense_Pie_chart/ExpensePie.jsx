import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import "./ExpensePie.css"
const ExpensePie = ({ expenses }) => {
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

  const data = groupedExpenses.map((expense) => ({
    name: expense.name,
    value: expense.value,
    percent: (expense.value / totalExpense) * 100,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Custom tooltip content formatter
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const { name, value, percent } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{name}</p>
          <p>₹{value} ( {percent.toFixed(2)}% )</p> {/* Added ₹ before value */}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container expense_bar_graph">
      <ResponsiveContainer width={350} height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value, percent }) => `${name} (${percent.toFixed(2)}%)`} 
            paddingAngle={5}
          >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Tooltip content={customTooltip} />
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ background: COLORS[index % COLORS.length] }}></div>
            <div className="legend-label">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePie;
