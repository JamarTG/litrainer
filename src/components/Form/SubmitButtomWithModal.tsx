import React, { useState } from "react";
import TrainerForm from "../Universal/Modals/TrainerForm";
import { Fields } from "../../types/form";
import { INITIAL_FORM_STATE } from "../../constants";
import useHandleSubmit from "../../hooks/useHandleSubmit";
interface SubmitButtonWithModalProps {
  text: string;
}

const SubmitButtonWithModal: React.FC<SubmitButtonWithModalProps> = ({
  text,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Fields>(INITIAL_FORM_STATE);

  const handleSubmit = useHandleSubmit(formData);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="">
      {isModalOpen && (
        <TrainerForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}

      <button
        onClick={handleToggleModal}
        className="relative inline-flex whitespace-nowrap h-fit w-[45%] sm:w-[35%] items-center justify-center rounded-lg text-white shadow-xs px-[calc(theme(spacing[5])-1px)] py-[calc(theme(spacing[3])-1px)]  bg-accent cursor-pointer   transition duration-150 arrow-button  "
      >
        <div className="inline-flex items-center font-bold  ">{text}</div>
      </button>
    </div>
  );
};

export default SubmitButtonWithModal;
