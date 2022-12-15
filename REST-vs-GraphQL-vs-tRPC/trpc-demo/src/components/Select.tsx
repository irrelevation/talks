interface Props extends React.ComponentPropsWithoutRef<"select"> {
  label: string;
  options: string[];
}

export const Select = ({ label, className, options, ...props }: Props) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="mt-1">
        <select
          {...props}
          className={
            "block w-full rounded-md border-gray-300 p-2 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " +
              className ?? ""
          }
        >
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
