import React from 'react';

const OutgoingDataTable = ({ data }) => {
  return (
    <div className="w-full">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full table-auto">
          <thead className="bg-blue-100 sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                Receiving Country
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                U.S. State from which the Child Emigrated
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                Number of Outgoing Adoption Cases
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue divide-y divide-blue-200">
            {data.map((country, index) => (
              <React.Fragment key={index}>
                {Object.entries(country.us_states).map(
                  ([state, cases], stateIndex) => (
                    <tr key={`${index}-${stateIndex}`}>
                      {stateIndex === 0 && (
                        <td
                          rowSpan={Object.keys(country.us_states).length}
                          className="px-3 py-2 whitespace-normal break-words align-top"
                        >
                          {country.receiving_country}
                        </td>
                      )}
                      <td className="px-3 py-2 whitespace-normal break-words">
                        {state}
                      </td>
                      <td className="px-3 py-2 whitespace-normal break-words">
                        {cases}
                      </td>
                    </tr>
                  )
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutgoingDataTable;
