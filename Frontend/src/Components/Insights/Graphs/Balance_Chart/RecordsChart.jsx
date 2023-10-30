import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const RecordsChart = ({ data }) => {
  return (
    <div className="income-expense-chart row">
      <div className="chart col-lg-6 col-md-6 col-sm-12">
        <LineChart
          width={isMobile() ? 250 : 500}
          height={isMobile() ? 180 : 280}
          data={data}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expenses" name="Expenses" stroke="red" />
        </LineChart>
      </div>
      <div className="chart col-lg-6 col-md-6 col-sm-12">
        <LineChart
          width={isMobile() ? 250 : 500}
          height={isMobile() ? 180 : 280}
          data={data}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" name="Income" stroke="green" />
        </LineChart>
      </div>
    </div>
  );
};


export default RecordsChart;

function isMobile() {
  return window.innerWidth <= 600;
}