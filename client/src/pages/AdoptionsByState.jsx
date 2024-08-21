import { useState, useEffect } from 'react';
import { fetchAdoptionsByState, fetchYears } from '../services/api';
import YearFilter from '../components/YearFilter';
import DataTable from '../components/DataTable';
import Chart from '../components/Chart';
import StateMap from '../components/StateMap';

const AdoptionsByState = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedState, setSelectedState] = useState(null);
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAdoptions, setTotalAdoptions] = useState(0);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const yearsResult = await fetchYears();
        setYears(['all', ...yearsResult.data]);
        const adoptionsResult = await fetchAdoptionsByState('all');
        setData(adoptionsResult.data);
        setTotalAdoptions(adoptionsResult.total_adoptions);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAdoptionsByState(selectedYear);
        setData(result.data);
        setTotalAdoptions(result.total_adoptions);
      } catch (error) {
        console.error('Error fetching adoptions by state:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
  };

  const columns = [
    { key: 'state', header: 'State' },
    { key: 'adoptions_finalized_abroad', header: 'Adoptions Finalized Abroad' },
    {
      key: 'adoptions_to_be_finalized_in_us',
      header: 'Adoptions to be Finalized in US',
    },
    { key: 'total_adoptions', header: 'Total Adoptions' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-7 text-center">
        Adoptions by State
      </h2>
      <div className="flex justify-center mb-8">
        <YearFilter
          years={years}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <StateMap
            data={data}
            year={selectedYear}
            selectedState={selectedState}
            onStateSelect={handleStateSelect}
          />
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">
              Total Adoptions: {totalAdoptions}
            </h3>
            <DataTable data={data} columns={columns} />
          </div>
          <div className="mt-8">
            <Chart
              data={data.slice(0, 10)}
              xKey="state"
              yKey="total_adoptions"
              title={`Top 10 States by Total Adoptions (${
                selectedYear === 'all' ? 'All Years' : selectedYear
              })`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdoptionsByState;
