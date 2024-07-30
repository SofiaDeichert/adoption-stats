import { useState, useEffect } from 'react';
import { fetchOutgoingAdoptions } from '../services/api';
import YearFilter from '../components/YearFilter';
import DataTable from '../components/DataTable';
import Chart from '../components/Chart';

const OutgoingAdoptions = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2023');
  const years = ['2023', '2022', '2021', '2020'];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchOutgoingAdoptions(selectedYear);
      setData(result.data);
    };
    fetchData();
  }, [selectedYear]);

  const columns = [
    { key: 'receiving_country', header: 'Receiving Country' },
    { key: 'total_cases', header: 'Total Cases' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Outgoing Adoptions</h2>
      <YearFilter
        years={years}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
      <div className="mt-8">
        <DataTable data={data} columns={columns} />
      </div>
      <div className="mt-8">
        <Chart
          data={data}
          xKey="receiving_country"
          yKey="total_cases"
          title="Outgoing Adoptions by Receiving Country"
        />
      </div>
    </div>
  );
};

export default OutgoingAdoptions;
