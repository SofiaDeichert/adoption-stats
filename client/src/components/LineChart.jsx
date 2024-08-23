import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const percentChange = payload[0].payload.percentChange;
    return (
      <div className="bg-white p-4 border border-gray-300 rounded shadow">
        <p className="font-bold">{`Year: ${label}`}</p>
        <p>{`Adoptions: ${payload[0].value}`}</p>
        {percentChange !== null && (
          <p
            className={`${
              percentChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {`Change from previous year: ${percentChange.toFixed(2)}%`}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data, xKey, yKey, title, yAxisMax }) => {
  const dataMax = Math.max(...data.map((item) => item[yKey]));
  const adjustedYAxisMax = yAxisMax || Math.ceil(dataMax * 1.2);
  const tickCount = 5;
  const interval = adjustedYAxisMax / (tickCount - 1);
  const ticks = Array.from({ length: tickCount }, (_, i) =>
    Math.round(i * interval)
  );

  return (
    <div className="w-full h-96">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis domain={[0, adjustedYAxisMax]} ticks={ticks} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
