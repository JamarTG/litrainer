import List from "../common/List";
import { navButtons } from "../../constants/nav";
import { NavButton } from "../../types/nav";
import NavigationalButton from "./NavigationalButton";

const PuzzleNavigation = () => {
  const renderNavButton = (btn: NavButton) => {
    return <NavigationalButton btn={btn} />;
  };

  return (
    <div className="w-full flex flex-row items-center justify-center gap-2 sm:gap-4">
      <List items={navButtons} renderItem={renderNavButton} />
    </div>
  );
};

export default PuzzleNavigation;
