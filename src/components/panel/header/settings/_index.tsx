import { ICON_SIZES } from "@/constants/ui";
import { SettingsIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { lazy } from "react";

const SettingsDisplay = lazy(() => import("./SettingsDisplay"));

const SettingsTriggerButton = () => {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <Fragment>
      <button
        aria-label="Settings"
        title="Settings"
        onClick={() => setShowSettings(true)}
        className="w-16 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
      >
        <SettingsIcon size={ICON_SIZES.MEDIUM} />
      </button>

      {showSettings && <SettingsDisplay setShowSettings={setShowSettings} />}
    </Fragment>
  );
};

export default SettingsTriggerButton;
