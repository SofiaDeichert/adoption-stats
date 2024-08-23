import { useState, useEffect } from 'react';
import { Combobox, TextInput, useCombobox } from '@mantine/core';
import { fetchStates } from '../services/api';
import { ScrollArea } from '@mantine/core';

const StateSelection = ({ onStateChange }) => {
  const [states, setStates] = useState([]);
  const [value, setValue] = useState('');
  const combobox = useCombobox();

  useEffect(() => {
    const loadStates = async () => {
      try {
        const response = await fetchStates();
        setStates(['', ...response.data]);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    loadStates();
  }, []);

  const shouldFilterOptions = !states.some((state) => state === value);
  const filteredStates = shouldFilterOptions
    ? states.filter((state) =>
        state.toLowerCase().includes(value.toLowerCase().trim())
      )
    : states;

  const options = filteredStates.map((state) => (
    <Combobox.Option value={state} key={state}>
      {state || 'Country view'}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        onStateChange(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          placeholder="Select state"
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
  );
};

export default StateSelection;
