import GameInfoTriggerButton from "../game-info";
import NewSessionTriggerButton from "../new-session";
import SettingsTriggerButton from "../settings";

const PanelButtons = () => {
  return (
    <div className="rounded-sm flex text-sm mt-2">
      <GameInfoTriggerButton />
      <NewSessionTriggerButton />
      <SettingsTriggerButton />
    </div>
  );
};

export default PanelButtons;
