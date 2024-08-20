import { useState, useEffect } from 'react';
import { Combobox, TextInput, useCombobox, ScrollArea } from '@mantine/core';
import { fetchYears } from '../services/api';

const YearFilter = ({ onYearChange }) => {
  const [years, setYears] = useState([]);
  const [value, setValue] = useState('');
  const combobox = useCombobox();

  useEffect(() => {
    const loadYears = async () => {
      try {
        const response = await fetchYears();
        setYears(['all', ...response.data]);
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };
    loadYears();
  }, []);

  const shouldFilterOptions =
    value.toLowerCase() !== 'all years' &&
    !years.some((year) => year.toString() === value);
  const filteredYears = shouldFilterOptions
    ? years.filter((year) =>
        year.toString().toLowerCase().includes(value.toLowerCase().trim())
      )
    : years;

  // set dropbox options
  const options = filteredYears.map((year) => (
    <Combobox.Option value={year.toString()} key={year}>
      {year === 'all' ? 'All years' : year}
    </Combobox.Option>
  ));

  return (
    <div>
      <Combobox
        onOptionSubmit={(optionValue) => {
          // if dropbox option is 'all', set input to 'All years'
          setValue(optionValue === 'all' ? 'All years' : optionValue);
          onYearChange(optionValue);
          combobox.closeDropdown();
        }}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
            placeholder="Default - All years"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            <ScrollArea style={{ height: 100 }}>
              {options.length === 0 ? (
                <Combobox.Empty>No results found</Combobox.Empty>
              ) : (
                options
              )}
            </ScrollArea>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};

export default YearFilter;
