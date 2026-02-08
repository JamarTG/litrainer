import PanelBody from "./body";
import PanelHeader from "./header";

const Panel = () => {
  return (
    <div className="h-full sm:h-full sm:mb-2 md:min-h-[550px] bg-zinc-300 flex flex-col gap-4 w-full shadow-sm rounded-lg  border-gray-400 dark:bg-[#222] dark:border-gray-700">
      <PanelHeader />
      <PanelBody />
    </div>
  );
};

export default Panel;
