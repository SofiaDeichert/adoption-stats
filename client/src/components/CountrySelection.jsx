import { useState, useEffect } from 'react';
import { Combobox, TextInput, useCombobox } from '@mantine/core';
import { fetchCountries } from '../services/api';
import { ScrollArea } from '@mantine/core';

const CountrySelection = ({ onCountryChange, dropdownHeight }) => {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState('');
  const combobox = useCombobox();

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetchCountries();
        setCountries(['', ...response.data]);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    loadCountries();
  }, []);

  const shouldFilterOptions = !countries.some((country) => country === value);
  const filteredCountries = shouldFilterOptions
    ? countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase().trim())
      )
    : countries;

  const options = filteredCountries.map((country) => (
    <Combobox.Option value={country} key={country}>
      {country || 'World view'}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        onCountryChange(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          placeholder="Select country"
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
          <ScrollArea style={{ height: dropdownHeight }}>
            {options.length === 0 ? (
              <Combobox.Empty>No results found</Combobox.Empty>
            ) : (
              options
            )}
          </ScrollArea>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default CountrySelection;
