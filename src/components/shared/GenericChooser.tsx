import { useState } from "react";

interface GenericChooserProps<T> {
  label?: string;
  options: T[];
  selected: string;
  onSelect: (value: string) => void;
  getDisplay: (option: T) => JSX.Element;
  getOptionKey: (option: T) => string;
}
const GenericChooser = <T,>({ options, selected, onSelect, getDisplay, getOptionKey }: GenericChooserProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4 relative">
      <button
        onClick={toggleDropdown}
        className=" p-1 flex items-center justify-between rounded-md  transition"
      >
        <span className="flex-1 flex items-center justify-center">
          <div className="flex gap-1">
            {selected && getDisplay(options.find((opt) => getOptionKey(opt) === selected)!)}
          </div>
        </span>
        <span
          className="ml-2"
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.23 7.21a1 1 0 0 1 1.42 0L10 10.59l3.35-3.38a1 1 0 1 1 1.42 1.42l-4.06 4.09a1 1 0 0 1-1.42 0L5.23 8.63a1 1 0 0 1 0-1.42z" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="overflow-y-auto h-48 absolute z-10 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg w-full">
          {options.map((option) => (
            <li
              key={getOptionKey(option)}
              onClick={() => {
                onSelect(getOptionKey(option));
                setIsOpen(false);
              }}
              className="cursor-pointer dark:hover:bg-[#000] hover:bg-gray-100 px-4 py-2 w-full flex items-center gap-2"
            >
              {getDisplay(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenericChooser;

