import React from 'react';

const YearFilter = ({ years, selectedYear, onYearChange }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="year-select"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select Year:
      </label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) => onYearChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="all">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearFilter;
