import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import List from "../common/List";

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

  const renderGenericChooserOption = (option: T) => (
    <li
      key={getOptionKey(option)}
      onClick={() => {
        onSelect(getOptionKey(option));
        setIsOpen(false);
      }}
      className="cursor-pointer left-lg h-8 dark:hover:bg-[#000] hover:bg-zinc-100 px-4 py-2 flex items-center overflow-hidden gap-2 rounded w-80 max-w-96"
      style={{ minWidth: 0 }}
    >
      {getDisplay(option)}
    </li>
  );
  return (
    <div
      ref={dropdownRef}
      className="rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4 relative"
    >
      <button className="w-96 bg-green flex items-center rounded-md transition">
        <div className="flex justify-start w-1/2">
          <p>choose your set</p>
        </div>

        <div onClick={toggleDropdown} className="flex justify-center items-center w-1/2">
          <span className="flex-1 flex items-center justify-center">
            <div className="flex gap-1">
              {selected && getDisplay(options.find((opt) => getOptionKey(opt) === selected)!)}
            </div>
          </span>
          <span className="ml-2" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.23 7.21a1 1 0 0 1 1.42 0L10 10.59l3.35-3.38a1 1 0 1 1 1.42 1.42l-4.06 4.09a1 1 0 0 1-1.42 0L5.23 8.63a1 1 0 0 1 0-1.42z" />
            </svg>
          </span>
        </div>
      </button>

      {isOpen && (
        <ul className="overflow-y-auto max-h-32 max-w-96 absolute z-10 mt-2 bg-white dark:bg-zinc-800 rounded-md shadow-lg ">
          <List items={options} renderItem={renderGenericChooserOption} />
        </ul>
      )}
    </div>
  );
};

export default GenericChooser;
