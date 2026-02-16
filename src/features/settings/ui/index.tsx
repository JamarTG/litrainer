import { ICON_SIZES } from "@/constants/icons";
import { SettingsIcon } from "lucide-react";
import { Fragment, useState } from "react";
import SettingsDisplay from "./SettingsDisplay";
import Button from "@/components/shared/Button";

interface SettingsTriggerButtonProps {
  buttonClassName?: string;
  iconSize?: number;
}

const SettingsTriggerButton: React.FC<SettingsTriggerButtonProps> = ({ buttonClassName, iconSize = ICON_SIZES.SMALL }) => {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <Fragment>
      <Button aria-label="Settings" title="Settings" onClick={() => setShowSettings(true)} className={buttonClassName}>
        <SettingsIcon size={iconSize} /> Settings
      </Button>

      {showSettings && <SettingsDisplay setShowSettings={setShowSettings} />}
    </Fragment>
  );
};

export default SettingsTriggerButton;