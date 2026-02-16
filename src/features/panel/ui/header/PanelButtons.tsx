
import { GameInfoTriggerButton } from "@/features/game-info";
import { NewSessionTriggerButton } from "@/features/training-session";
import { SettingsTriggerButton } from "@/features/settings";

const PanelButtons = () => {
  return (
    <div className="rounded-sm flex flex-col text-sm mt-2 gap-2 items-start">
      <div className="shrink-0">
        <GameInfoTriggerButton />
      </div>
      <div className="shrink-0">
        <NewSessionTriggerButton />
      </div>
      <div className="shrink-0">
        <SettingsTriggerButton />
      </div>
    </div>
  );
};

export default PanelButtons;
