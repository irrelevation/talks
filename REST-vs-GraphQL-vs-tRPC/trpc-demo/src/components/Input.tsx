interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
}

export const Input = ({ label, className, ...props }: Props) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="mt-1">
        <input
          {...props}
          className={
            "block w-full rounded-md border-gray-300 p-2 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " +
              className ?? ""
          }
        />
      </div>
    </div>
  );
};
