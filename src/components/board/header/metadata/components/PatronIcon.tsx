import { PlayerIcons } from "@/constants/icons";
import { FC, PropsWithChildren } from "react";

interface PatronIconProps {
  isPatron: boolean | null;
}

const PatronIcon: FC<PropsWithChildren<PatronIconProps>> = ({ isPatron }) => {
  if (!isPatron) return;
  return <span className="icon text-orange-500" dangerouslySetInnerHTML={{ __html: PlayerIcons.patron }} />;
};

export default PatronIcon;
