import { Fragment, useState } from "react";
import TrainerForm from "./form/TrainerForm";
import { PlusCircle } from "lucide-react";
import { ICON_SIZES } from "@/constants/icons";

const NewSessionTriggerButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Fragment>
      <TrainerForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <button
        className="w-16 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
        aria-label="Create New Session"
        title="Create New Session"
        onClick={handleToggleModal}
      >
        <PlusCircle size={ICON_SIZES.MEDIUM} />
      </button>
    </Fragment>
  );
};

export default NewSessionTriggerButton;
