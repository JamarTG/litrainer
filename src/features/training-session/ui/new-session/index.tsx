import { Fragment, useState } from "react";
import TrainerForm from "./form/TrainerForm";
import { PlusCircle } from "lucide-react";
import { ICON_SIZES } from "@/constants/icons";
import Button from "@/components/shared/Button";

const NewSessionTriggerButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Fragment>
      <TrainerForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <Button aria-label="Create New Session" title="Create New Session" onClick={handleToggleModal}>
        <PlusCircle size={ICON_SIZES.SMALL} /> ADD YOUR OWN GAMES
      </Button>
    </Fragment>
  );
};

export default NewSessionTriggerButton;
