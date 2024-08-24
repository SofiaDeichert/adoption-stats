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
    <div className="min-h-screen bg-gradient-to-b  pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 text-blue-800 leading-tight">
          Incoming Adoptions
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-12">
          <div className="w-full md:w-64">
            <YearFilter
              years={years}
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
            />
          </div>
          <div className="w-full md:w-64">
            <CountrySelection
              onCountryChange={setSelectedCountry}
              initialCountry={selectedCountry}
              dropdownHeight={100}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="text-center text-2xl font-semibold text-gray-600">
            Loading...
          </div>
        ) : (
          <>
            <div className="mb-12 relative z-10">
              <CountryMap
                data={data}
                year={selectedYear}
                selectedCountry={selectedCountry}
              />
            </div>
            <div className="mt-8">
              <h3 className="text-center text-3xl font-bold mb-12 text-blue-800">
                Total Adoptions: {totalAdoptions}
              </h3>
              <div className="mt-8 flex flex-wrap justify-between">
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                  <TopCountriesPieChart data={data} />
                </div>
                <div className="w-full lg:w-1/2">
                  <DataTable data={data} columns={columns} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IncomingAdoptions;
