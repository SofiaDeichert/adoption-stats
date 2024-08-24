import { useState, useEffect } from 'react';
import { fetchIncomingAdoptions, fetchYears } from '../services/api';
import YearFilter from '../components/YearFilter';
import CountrySelection from '../components/CountrySelection';
import CountryMap from '../components/CountryMap';
import DataTable from '../components/DataTable';
import TopCountriesPieChart from '../components/TopCountriesPieChart';

const IncomingAdoptions = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAdoptions, setTotalAdoptions] = useState(0);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const yearsResult = await fetchYears();
        setYears(['all', ...yearsResult.data]);

        const adoptionsResult = await fetchIncomingAdoptions('all');
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
        const result = await fetchIncomingAdoptions(selectedYear);
        setData(result.data);
        setTotalAdoptions(result.total_adoptions);
      } catch (error) {
        console.error('Error fetching incoming adoptions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

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
      <h2 className="text-4xl font-bold mb-12 mt-4 text-center">
        Incoming Adoptions
      </h2>
      <div className="flex space-x-32 mb-32 justify-center">
        <YearFilter
          years={years}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
        <CountrySelection
          onCountryChange={setSelectedCountry}
          initialCountry={selectedCountry}
          dropdownHeight={100}
        />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <CountryMap
            data={data}
            year={selectedYear}
            selectedCountry={selectedCountry}
          />
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">
              Total Adoptions: {totalAdoptions}
            </h3>
            <div className="mt-8 flex flex-wrap justify-between">
              <div className="w-full md:w-1/2 mb-8">
                <TopCountriesPieChart data={data} />
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

export default IncomingAdoptions;
