import { Fragment, ReactNode, useState } from "react";
import TrainerPanel from "./form/TrainerPanel";
import { PlusCircle } from "lucide-react";
import { ICON_SIZES } from "@/constants/icons";
import Button from "@/components/shared/Button";

interface NewSessionTriggerButtonProps {
  buttonClassName?: string;
  iconSize?: number;
  showLabel?: boolean;
  iconOverride?: ReactNode;
}


const NewSessionTriggerButton: React.FC<NewSessionTriggerButtonProps> = ({
  buttonClassName,
  iconSize = ICON_SIZES.SMALL,
  showLabel = true,
  iconOverride
}) => {
  const [showTrainer, setShowTrainer] = useState<boolean>(false);

  const handleToggleTrainer = () => {
    setShowTrainer(!showTrainer);
  };

  return (
    <Fragment>
      {/* <TrainerForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}

      <Button
        aria-label="Create New Session"
        title="Create New Session"
        onClick={handleToggleTrainer}
        className={buttonClassName}
      >
        {iconOverride ?? <PlusCircle size={iconSize} />} {showLabel ? "Add Games" : null}
      </Button>

      {showTrainer && <TrainerPanel setShowTrainer={setShowTrainer} />}
    </Fragment>
  );
};

export default NewSessionTriggerButton;