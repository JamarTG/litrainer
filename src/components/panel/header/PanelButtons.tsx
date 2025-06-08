import GameInfoTriggerButton from "./game-info/_index";
import NewSessionTriggerButton from "./new-session/_index";
import SettingsTriggerButton from "./settings/_index";

const PanelButtons = () => {
  return (
    <div className="flex justify-center">
      <GameInfoTriggerButton />
      <NewSessionTriggerButton />
      <SettingsTriggerButton />
    </div>
  );
};

export default PanelButtons;
