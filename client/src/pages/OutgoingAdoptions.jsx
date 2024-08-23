import { useState, useEffect } from 'react';
import { fetchOutgoingAdoptions, fetchYears } from '../services/api';
import YearFilter from '../components/YearFilter';
import OutgoingDataTable from '../components/OutgoingDataTable';
import Chart from '../components/Chart';

const OutgoingAdoptions = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCases, setTotalCases] = useState(0);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const yearsResult = await fetchYears();
        setYears(['all', ...yearsResult.data]);
        const adoptionsResult = await fetchOutgoingAdoptions('all');
        setData(adoptionsResult.data);
        setTotalCases(adoptionsResult.total_cases);
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
        const result = await fetchOutgoingAdoptions(selectedYear);
        setData(result.data);
        setTotalCases(result.total_cases);
      } catch (error) {
        console.error('Error fetching outgoing adoptions:', error);
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
    { key: 'receiving_country', header: 'Receiving Country' },
    { key: 'total_cases', header: 'Total Cases' },
  ];

  // Data for receiving countries chart
  const receivingCountriesChartData = data
    .sort((a, b) => b.total_cases - a.total_cases)
    .slice(0, 10);

  // Data for U.S. states chart
  const usStatesChartData = data
    .reduce((acc, country) => {
      Object.entries(country.us_states).forEach(([state, cases]) => {
        const existingState = acc.find((item) => item.state === state);
        if (existingState) {
          existingState.total_cases += cases;
        } else {
          acc.push({ state, total_cases: cases });
        }
      });
      return acc;
    }, [])
    .sort((a, b) => b.total_cases - a.total_cases)
    .slice(0, 10);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-7 text-center">
        Outgoing Adoptions
      </h2>
      <div className="flex justify-center mb-32">
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
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">
              Total Cases: {totalCases}
            </h3>
            <OutgoingDataTable data={data} columns={columns} />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Chart
              data={receivingCountriesChartData}
              xKey="receiving_country"
              yKey="total_cases"
              title={`Top Receiving Countries (${
                selectedYear === 'all' ? 'All Years' : selectedYear
              })`}
            />
            <Chart
              data={usStatesChartData}
              xKey="state"
              yKey="total_cases"
              title={`Top U.S. States of Origin (${
                selectedYear === 'all' ? 'All Years' : selectedYear
              })`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OutgoingAdoptions;
