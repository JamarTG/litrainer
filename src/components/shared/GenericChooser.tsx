import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useClickOutside(dropdownRef, setIsOpen, isOpen);
  return (
    <div
      ref={dropdownRef}
      className="rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4 relative"
    >
      <button
        onClick={toggleDropdown}
        className="gap-5 p-1 flex items-center justify-center rounded-md transition"
      >
        <p className="bg-red-500">Choose your set</p>
        <div className="flex justify-center items-center">
          <span className="bg-green-600 flex-1 flex items-center justify-center">
            <div className="flex gap-1">{selected && getDisplay(options.find((opt) => getOptionKey(opt) === selected)!)}</div>
          </span>
          <span
            className="ml-2"
            aria-hidden="true"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.23 7.21a1 1 0 0 1 1.42 0L10 10.59l3.35-3.38a1 1 0 1 1 1.42 1.42l-4.06 4.09a1 1 0 0 1-1.42 0L5.23 8.63a1 1 0 0 1 0-1.42z" />
            </svg>
          </span>
        </div>
      </button>
      {isOpen && (
        <ul
          className="overflow-y-auto max-h-64 gap-10  absolute z-10 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2 auto-rows-fr"
          style={{ display: "grid", gridAutoFlow: "row", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}
        >
          {options.map((option) => (
            <li
              key={getOptionKey(option)}
              onClick={() => {
                onSelect(getOptionKey(option));
                setIsOpen(false);
              }}
              className="cursor-pointer h-8 dark:hover:bg-[#000] hover:bg-gray-100 px-4 py-2 flex items-center gap-2 rounded"
              style={{ minWidth: 0 }}
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
