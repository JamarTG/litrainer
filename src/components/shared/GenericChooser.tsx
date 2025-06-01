import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import List from "../common/List";
import { ChevronDown } from "lucide-react";

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
      className="cursor-pointer h-8 dark:hover:bg-[#000] hover:bg-zinc-100 px-4 py-2 flex items-center overflow-hidden gap-2 rounded w-64 "
    
    >
      {getDisplay(option)}
    </li>
  );
  return (
    <div
      ref={dropdownRef}
      className="flex sm:flex-row items-center justify-center sm:items-start gap-4 relative"
    >
      <button className="w-72 flex items-center rounded-md transition">
        <div className="flex justify-start w-1/2">
          <p>choose your set</p>
        </div>

        <div onClick={toggleDropdown} className="flex justify-between items-center h-8 w-40">
          <span className="flex-1 flex items-center justify-center">
            <div className="flex gap-1">
              {selected && getDisplay(options.find((opt) => getOptionKey(opt) === selected)!)}
            </div>
          </span>
          <ChevronDown />
        </div>
      </button>

      {isOpen && (
        <ul className="overflow-y-auto max-h-32 max-w-72 absolute top-6 z-10 mt-2 bg-white dark:bg-zinc-900 shadow-lg ">
          <List items={options} renderItem={renderGenericChooserOption} />
        </ul>
      )}
    </div>
  );
};

export default GenericChooser;
