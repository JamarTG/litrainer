import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface PlayerIconProps {
  color: "w" | "b";
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ color }) => {
  return (
    <FontAwesomeIcon
      icon={faCircle}
      color={color === "w" ? "#ffffff" : "#000000"}
      size="lg"
    />
  );
};

export default PlayerIcon;
