import { Fragment, useState } from "react";
import TrainerForm from "./form/TrainerForm";
import { PlusCircle } from "lucide-react";
import { ICON_SIZES } from "@/constants/icons";
import Button from "@/components/shared/Button";

interface NewSessionTriggerButtonProps {
  buttonClassName?: string;
  iconSize?: number;
}

const NewSessionTriggerButton: React.FC<NewSessionTriggerButtonProps> = ({
  buttonClassName,
  iconSize = ICON_SIZES.SMALL
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
        <PlusCircle size={iconSize} /> Add Games
      </Button>
    </Fragment>
  );
};

export default NewSessionTriggerButton;
