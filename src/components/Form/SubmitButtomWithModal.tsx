import React, { useState } from "react";
import TrainerForm from "../Universal/Modals/TrainerForm";
import { Fields } from "../../types/form";
import { INITIAL_FORM_STATE } from "../../constants";
import useHandleSubmit from "../../hooks/useHandleSubmit";
interface SubmitButtonWithModalProps {
  text: string;
}

const SubmitButtonWithModal: React.FC<SubmitButtonWithModalProps> = ({
  text
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Fields>(INITIAL_FORM_STATE);

  const handleSubmit = useHandleSubmit(formData);
  
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center">
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
        className="w-auto h-auto flex items-center justify-center rounded-lg text-white shadow-xs px-4 py-2 cursor-pointer bg-accent transition duration-150 hover:bg-accent-dark text-lg"
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButtonWithModal;
