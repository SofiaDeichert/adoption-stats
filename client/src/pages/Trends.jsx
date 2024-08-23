import React, { useState, useEffect } from 'react';
import {
  Combobox,
  TextInput,
  useCombobox,
  ScrollArea,
  NumberInput,
} from '@mantine/core';
import CustomLineChart from '../components/LineChart';
import {
  fetchAdoptionsByState,
  fetchIncomingAdoptions,
  fetchYears,
} from '../services/api';

const Trends = () => {
  const [stateData, setStateData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showCountry, setShowCountry] = useState(false);
  const [yAxisMax, setYAxisMax] = useState(null);
  const combobox = useCombobox();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const yearsResult = await fetchYears();
        setYears(yearsResult.data.sort((a, b) => a - b));

        const statePromises = yearsResult.data.map((year) =>
          fetchAdoptionsByState(year)
        );
        const countryPromises = yearsResult.data.map((year) =>
          fetchIncomingAdoptions(year)
        );

        const stateResults = await Promise.all(statePromises);
        const countryResults = await Promise.all(countryPromises);

        setStateData(stateResults);
        setCountryData(countryResults);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const getChartData = () => {
    const data = showCountry ? countryData : stateData;
    const selected =
      selectedOption || (showCountry ? 'All Countries' : 'All States');

    let chartData = years.map((year, index) => {
      let adoptions;
      if (selected === 'All States' || selected === 'All Countries') {
        adoptions = data[index].data.reduce(
          (sum, item) => sum + item.total_adoptions,
          0
        );
      } else {
        const yearData = data[index].data.find((d) =>
          showCountry ? d.country === selected : d.state === selected
        );
        adoptions = yearData ? yearData.total_adoptions : 0;
      }
      return { year, adoptions };
    });

    // Calculate percent change
    chartData = chartData.map((item, index, array) => {
      if (index === 0) {
        return { ...item, percentChange: null };
      }
      const previousAdoptions = array[index - 1].adoptions;
      const percentChange =
        previousAdoptions !== 0
          ? ((item.adoptions - previousAdoptions) / previousAdoptions) * 100
          : null;
      return { ...item, percentChange };
    });

    return chartData;
  };

  const toggleView = () => {
    setShowCountry(!showCountry);
    setSelectedOption('');
    setInputValue('');
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  const options = showCountry
    ? ['All Countries', ...new Set(countryData[0].data.map((d) => d.country))]
    : ['All States', ...new Set(stateData[0].data.map((d) => d.state))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Adoption Trends</h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={toggleView}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showCountry ? 'Switch to U.S. States' : 'Switch to Countries'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 pr-4 mb-4 md:mb-0">
          <Combobox
            onOptionSubmit={(value) => {
              setSelectedOption(value);
              setInputValue(value);
              combobox.closeDropdown();
            }}
            store={combobox}
          >
            <Combobox.Target>
              <TextInput
                placeholder={`Select ${showCountry ? 'country' : 'state'}`}
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.currentTarget.value);
                  combobox.openDropdown();
                  combobox.updateSelectedOptionIndex();
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
              />
            </Combobox.Target>

            <Combobox.Dropdown>
              <ScrollArea style={{ height: 200 }}>
                <Combobox.Options>
                  {options.map((option) => (
                    <Combobox.Option value={option} key={option}>
                      {option}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </ScrollArea>
            </Combobox.Dropdown>
          </Combobox>
        </div>

        <div className="w-full md:w-3/4">
          <CustomLineChart
            data={getChartData()}
            xKey="year"
            yKey="adoptions"
            title={`Adoptions ${showCountry ? 'from' : 'in'} ${
              selectedOption || (showCountry ? 'All Countries' : 'All States')
            } by Year`}
            yAxisMax={yAxisMax}
          />
        </div>
      </div>
    </div>
  );
};

export default Trends;
