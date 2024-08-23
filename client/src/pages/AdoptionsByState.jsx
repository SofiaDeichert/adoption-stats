import { useState, useEffect } from 'react';
import { fetchAdoptionsByState, fetchYears } from '../services/api';
import YearFilter from '../components/YearFilter';
import StateSelection from '../components/StateSelection';
import DataTable from '../components/DataTable';
import StateMap from '../components/StateMap';
import TopReceivingStatesPieChart from '../components/TopReceivingStatesPieChart';

const AdoptionsByState = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedState, setSelectedState] = useState('');
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

  const handleStateChange = (state) => {
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
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Adoptions by State
      </h2>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-32">
        <div className="w-full sm:w-64">
          <YearFilter
            years={years}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
          />
        </div>
        <div className="w-full sm:w-64">
          <StateSelection
            onStateChange={handleStateChange}
            initialState={selectedState}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <StateMap
            data={data}
            year={selectedYear}
            selectedState={selectedState}
            onStateSelect={handleStateChange}
          />
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">
              Total Adoptions: {totalAdoptions}
            </h3>

            <div className="mt-8 flex flex-wrap justify-between">
              <div className="w-full md:w-1/2 mb-8">
                <TopReceivingStatesPieChart data={data} />
              </div>
              <div className="w-full md:w-1/2">
                <DataTable data={data} columns={columns} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdoptionsByState;
