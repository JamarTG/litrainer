import { ICON_SIZES } from "@/constants/icons";
import { SettingsIcon } from "lucide-react";
import { Fragment, ReactNode, useState } from "react";
import SettingsDisplay from "./SettingsDisplay";
import Button from "@/components/shared/Button";

interface SettingsTriggerButtonProps {
  buttonClassName?: string;
  iconSize?: number;
  showLabel?: boolean;
  iconOverride?: ReactNode;
}

const SettingsTriggerButton: React.FC<SettingsTriggerButtonProps> = ({ buttonClassName, iconSize = ICON_SIZES.SMALL, showLabel = true, iconOverride }) => {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <Fragment>
      <Button aria-label="Settings" title="Settings" onClick={() => setShowSettings(true)} className={buttonClassName}>
        {iconOverride ?? <SettingsIcon size={iconSize} />} {showLabel ? "Settings" : null}
      </Button>

      {showSettings && <SettingsDisplay setShowSettings={setShowSettings} />}
    </Fragment>
  );
};

export default SettingsTriggerButton;