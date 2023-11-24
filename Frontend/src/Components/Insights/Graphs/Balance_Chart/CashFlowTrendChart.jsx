import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./CashFlowTrend.css";

const CashFlowTrend = ({ data }) => {
  return (
    <div className="cashflow-chart">
      <div>
        <BarChart
          width={isMobile() ? 300 : 650}
          height={isMobile() ? 180 : 300}
          data={data}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" name="Income" fill="green" stackId="stack" />
          <Bar dataKey="expenses" name="Expense" fill="red" stackId="stack" />
        </BarChart>
      </div>
    </div>
  );
};

export default CashFlowTrend;

function isMobile() {
  return window.innerWidth <= 600;
}
