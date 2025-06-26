import { Fragment } from "react";
import PanelBody from "./body";
import PanelHeader from "./header";

const Panel = () => {
  return (
    <div className=" bg-zinc-300 flex flex-col gap-4 w-full min-w-[250px] min-h-[500px]  rounded-sm shadow-xs border border-gray-400 dark:bg-[#222] dark:border-gray-700">
      <Fragment>
        <PanelHeader />
        <PanelBody />
      </Fragment>
    </div>
  );
};

export default Panel;
