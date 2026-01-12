import { ICON_SIZES } from "@/constants/icons";
import { SettingsIcon } from "lucide-react";
import { Fragment, useState } from "react";
import SettingsDisplay from "./components/SettingsDisplay";
import Button from "@/components/shared/Button";

const SettingsTriggerButton = () => {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <Fragment>
      <Button aria-label="Settings" title="Settings" onClick={() => setShowSettings(true)}>
        <SettingsIcon size={ICON_SIZES.SMALL} /> SETTINGS
      </Button>

      {showSettings && <SettingsDisplay setShowSettings={setShowSettings} />}
    </Fragment>
  );
};

export default SettingsTriggerButton;
