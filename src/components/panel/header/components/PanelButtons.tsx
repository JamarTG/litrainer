import GameInfoTriggerButton from "../game-info";
import NewSessionTriggerButton from "../new-session";
import SettingsTriggerButton from "../settings";

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
