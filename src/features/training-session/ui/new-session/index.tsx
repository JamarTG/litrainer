import { Fragment, ReactNode, useState } from "react";
import TrainerForm from "./form/TrainerForm";
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Fragment>
      <TrainerForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <Button
        aria-label="Create New Session"
        title="Create New Session"
        onClick={handleToggleModal}
        className={buttonClassName}
      >
        {iconOverride ?? <PlusCircle size={iconSize} />} {showLabel ? "Add Games" : null}
      </Button>
    </Fragment>
  );
};

export default NewSessionTriggerButton;
