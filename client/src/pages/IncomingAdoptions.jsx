import { useState, useEffect } from 'react';
import { fetchIncomingAdoptions } from '../services/api';
import Map from '../components/Map';
import YearFilter from '../components/YearFilter';
import DataTable from '../components/DataTable';
import Chart from '../components/Chart';

const IncomingAdoptions = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2023');
  const years = ['2023', '2022', '2021', '2020'];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchIncomingAdoptions(selectedYear);
      setData(result.data);
    };
    fetchData();
  }, [selectedYear]);

  const columns = [
    { key: 'country', header: 'Country' },
    { key: 'adoptions_finalized_abroad', header: 'Adoptions Finalized Abroad' },
    {
      key: 'adoptions_to_be_finalized_in_us',
      header: 'Adoptions to be Finalized in US',
    },
    { key: 'total_adoptions', header: 'Total Adoptions' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Incoming Adoptions</h2>
      <YearFilter
        years={years}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
      <Map data={data} year={selectedYear} />
      <div className="mt-8">
        {/* <DataTable data={data} columns={columns} /> */}
      </div>
      <div className="mt-8">
        {/* <Chart
          data={data.slice(0, 10)}
          xKey="country"
          yKey="total_adoptions"
          title="Top 10 Countries by Total Adoptions"
        /> */}
      </div>
    </div>
  );
};

export default IncomingAdoptions;
