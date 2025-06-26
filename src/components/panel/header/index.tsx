import StockfishDetails from "./StockfishDetails";
import PanelButtons from "./PanelButtons";

const PanelHeader = () => {
  return (
    <div className="relative bh-12 dark:text-zinc-400 flex items-center justify-between">
      <StockfishDetails />
      <PanelButtons />
    </div>
  );
};

export default PanelHeader;
