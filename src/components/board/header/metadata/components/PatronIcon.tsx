import { PlayerIcons } from "@/constants/icons";
import { FC, PropsWithChildren } from "react";

const PatronIcon: FC<PropsWithChildren> = ({ children }) => (
  <span className="icon text-orange-500" dangerouslySetInnerHTML={{ __html: PlayerIcons.patron }}>
    {children}
  </span>
);

export default PatronIcon;
