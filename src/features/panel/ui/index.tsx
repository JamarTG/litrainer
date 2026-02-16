import PanelBody from "./body";
import PanelHeader from "./header";

const Panel = () => {
  return (
    <div className="h-full w-full md:max-w-96 sm:h-full sm:mb-2 md:min-h-[550px] md:bg-[var(--color-surface-strong)] flex flex-col gap-4 shadow-sm border border-[var(--color-border)] rounded-md">
      <PanelHeader />
      <PanelBody />
    </div>
  );
};

export default Panel;
