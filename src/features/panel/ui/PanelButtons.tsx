import { GameInfoTriggerButton } from "@/features/game-info";
import { NewSessionTriggerButton } from "@/features/training-session";
import { SettingsTriggerButton } from "@/features/settings";

interface PanelButtonsProps {
  iconOnly?: boolean;
}

const PanelButtons: React.FC<PanelButtonsProps> = ({ iconOnly = false }) => {
  if (iconOnly) {
    return (
      <div className="rounded-sm flex items-center justify-center w-full max-w-md">
        <NewSessionTriggerButton
          buttonClassName="h-9 w-9 rounded-full px-0 py-0"
          iconSize={16}
          showLabel={false}
          iconOverride={<span aria-hidden className="text-lg leading-none">＋</span>}
        />
      </div>
    );
  }

  return (
    <div className="rounded-sm flex flex-col gap-3 w-full max-w-md">
      <div className="min-w-0">
        <NewSessionTriggerButton
          buttonClassName="w-full justify-center px-3 py-2 text-base font-medium rounded-full gap-2.5"
          iconSize={24}
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-3">
        <div className="min-w-0">
          <GameInfoTriggerButton
            buttonClassName="w-full justify-center px-3 py-2 text-base font-medium rounded-full gap-2.5"
            iconSize={24}
          />
        </div>
        <div className="min-w-0">
          <SettingsTriggerButton
            buttonClassName="w-full justify-center px-3 py-2 text-base font-medium rounded-full gap-2.5"
            iconSize={24}
          />
        </div>
      </div>
    </div>
  );
};

export default PanelButtons;
