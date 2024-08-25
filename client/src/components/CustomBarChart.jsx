import { useState, useEffect, useCallback } from 'react';
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
  const [labelAngle, setLabelAngle] = useState(0);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setLabelAngle(-45);
    } else {
      setLabelAngle(0);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div
      className="w-full"
      style={{ height: 'calc(50vh + 200px)', minHeight: '500px' }}
    >
      <h3 className="text-blue-800 text-lg font-semibold mb-2">{title}</h3>
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 100,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xKey}
              angle={labelAngle}
              textAnchor={labelAngle !== 0 ? 'end' : 'middle'}
              interval={0}
              tick={{
                fontSize: 12,
                fill: '#4A5568',
              }}
              height={100}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
