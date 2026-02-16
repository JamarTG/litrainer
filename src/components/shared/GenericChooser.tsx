import { useRef, useState } from "react";
import useClickOutside from "@/hooks/panel/useClickOutside";
import { ChevronDown } from "lucide-react";

interface GenericChooserProps<T> {
  label?: string;
  options: T[];
  selected: string;
  onSelect: (value: string) => void;
  getDisplay: (option: T) => JSX.Element;
  getOptionKey: (option: T) => string;
}
const GenericChooser = <T,>({ label, options, selected, onSelect, getDisplay, getOptionKey }: GenericChooserProps<T>) => {
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
      className="cursor-pointer min-h-9 px-3 py-1.5 flex items-center overflow-hidden gap-2 rounded-md hover:bg-[var(--color-surface-hover)] transition-colors"
    >
      {getDisplay(option)}
    </li>
  );
  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors flex items-center justify-between gap-3"
      >
        <div className="min-w-0 text-left flex-1">
          <p className="text-xs uppercase tracking-wide text-[var(--color-muted)] font-semibold">{label ?? "Option"}</p>
          <div className="text-sm text-[var(--color-fg)] truncate">{selected || "Select"}</div>
        </div>

        <ChevronDown size={16} className={`text-[var(--color-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <ul className="overflow-y-auto max-h-48 w-full absolute top-full z-20 mt-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-sm p-1">
          {options.map(renderGenericChooserOption)}
        </ul>
      )}
    </div>
  );
};

export default GenericChooser;
