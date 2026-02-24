import PanelBody from "./PanelBody";
import PanelHeader from "./PanelHeader";

const Panel = () => {
  return (
    <div className="h-full w-full md:max-w-96 sm:h-full sm:mb-2 md:min-h-[550px] md:bg-[var(--color-surface-strong)] flex flex-col gap-1 md:gap-4 shadow-sm border border-[var(--color-border)] rounded-md">
      <PanelHeader />
      <PanelBody />
    </div>
  );
};

export default Panel;
