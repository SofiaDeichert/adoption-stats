const DataTable = ({ data, columns }) => {
  return (
    <div className="w-full">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full table-auto">
          <thead className="bg-blue-50 sticky top-0">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-blue-800 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-3 py-2 whitespace-normal break-words"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
