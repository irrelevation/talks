interface TableProps {
  labels: Record<string, string>;
  rows?: Record<string, unknown>[];
  title: string;
  description: string;
}

export const Table = ({ labels, rows, title, description }: TableProps) => {
  rows ??= [{}];
  const transformedRows = rows.map((row) => {
    return Object.keys(labels).map((key) => row[key]);
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-sm font-semibold text-white text-opacity-70">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.values(labels).map((label) => (
                      <th
                        key={label}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {label}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {transformedRows?.map((row, index) => (
                    <tr key={index}>
                      {row.map((value, index) => (
                        <td
                          key={index}
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {String(value)}
                        </td>
                      ))}

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
