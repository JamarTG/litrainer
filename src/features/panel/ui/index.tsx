import PanelBody from "./body";
import PanelHeader from "./header";

const Panel = () => {
  return (
    <div className="h-full w-full md:max-w-96 sm:h-full sm:mb-2 md:min-h-[550px]  md:bg-zinc-300 md:dark:bg-[#222] flex flex-col gap-4 shadow-sm border-gray-400  dark:border-gray-700">
      <PanelHeader />
      <PanelBody />
    </div>
  );
};

export default Panel;
