import { useState, useEffect } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import { fetchStates } from '../services/api';

const StateSelection = ({ onStateChange, initialState = '' }) => {
  const [states, setStates] = useState([]);
  const [value, setValue] = useState(initialState);
  const [search, setSearch] = useState(initialState);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    const loadStates = async () => {
      try {
        const response = await fetchStates();
        setStates(['', ...response.data]); // Add empty string for "Clear selection"
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    loadStates();
  }, []);

  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(search.toLowerCase().trim())
  );

  const handleStateSelect = (selectedState) => {
    setValue(selectedState);
    setSearch(selectedState);
    onStateChange(selectedState);
    combobox.closeDropdown();
  };

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleStateSelect}
      withinPortal={false}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
          }}
          placeholder="Select state"
          value={search}
          onChange={(event) => {
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {filteredStates.length > 0 ? (
            filteredStates.map((state) => (
              <Combobox.Option value={state} key={state}>
                {state || 'Reset map'}
              </Combobox.Option>
            ))
          ) : (
            <Combobox.Empty>No results found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default StateSelection;
