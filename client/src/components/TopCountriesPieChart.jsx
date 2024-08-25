import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#e94396', '#FF8042', '#8884D8'];

const TopCountriesPieChart = ({ data }) => {
  // Sort the data by total_adoptions in descending order and take the top 5
  const topCountries = data
    .sort((a, b) => b.total_adoptions - a.total_adoptions)
    .slice(0, 5);

  const totalAdoptions = topCountries.reduce(
    (sum, country) => sum + country.total_adoptions,
    0
  );

  const pieData = topCountries.map((country) => ({
    name: country.country,
    value: country.total_adoptions,
    percentage: ((country.total_adoptions / totalAdoptions) * 100).toFixed(2),
  }));

  return (
    <div className="h-96 w-full">
      <h3 className="text-blue-800 text-xl font-semibold mb-4 text-center">
        Top 5 Countries of Origin
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percentage }) => `${name} ${percentage}%`}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCountriesPieChart;
