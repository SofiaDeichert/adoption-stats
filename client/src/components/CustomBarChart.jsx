import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomBarChart = ({ data, xKey, yKey, title }) => {
  return (
    <div className="h-96">
      <h3 className="text-blue-800 text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
