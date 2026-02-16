
import { GameInfoTriggerButton } from "@/features/game-info";
import { NewSessionTriggerButton } from "@/features/training-session";
import { SettingsTriggerButton } from "@/features/settings";

interface PanelButtonsProps {
  iconOnly?: boolean;
}

const PanelButtons: React.FC<PanelButtonsProps> = ({ iconOnly = false }) => {
  if (iconOnly) {
    return (
      <div className="rounded-sm flex items-center justify-center gap-2 w-full max-w-md">
        <NewSessionTriggerButton
          buttonClassName="h-9 w-9 rounded-full px-0 py-0"
          iconSize={16}
          showLabel={false}
          iconOverride={<span aria-hidden className="text-lg leading-none">＋</span>}
        />
        <GameInfoTriggerButton
          buttonClassName="h-9 w-9 rounded-full px-0 py-0"
          iconSize={16}
          showLabel={false}
          iconOverride={<span aria-hidden className="text-base leading-none">i</span>}
        />
        <SettingsTriggerButton
          buttonClassName="h-9 w-9 rounded-full px-0 py-0"
          iconSize={16}
          showLabel={false}
          iconOverride={<span aria-hidden className="text-base leading-none">⚙</span>}
        />
      </div>
    );
  }

  return (
    <div className="rounded-sm flex flex-col gap-2.5 w-full max-w-md">
      <div className="w-full">
        <NewSessionTriggerButton buttonClassName="w-full justify-center px-3 py-2 text-sm font-medium rounded-md gap-2" iconSize={16} />
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        <div className="min-w-0">
          <GameInfoTriggerButton buttonClassName="w-full justify-center px-2.5 py-1.5 text-xs sm:text-sm font-medium rounded-md gap-1.5" iconSize={15} />
        </div>
        <div className="min-w-0">
          <SettingsTriggerButton buttonClassName="w-full justify-center px-2.5 py-1.5 text-xs sm:text-sm font-medium rounded-md gap-1.5" iconSize={15} />
        </div>
      </div>
    </div>
  );
};

export default PanelButtons;
