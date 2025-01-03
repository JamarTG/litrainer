import React, { Dispatch, useState } from "react";
import TrainerForm from "../../../components/ui/Modals/TrainerForm";
import { Fields } from "../../../types/form";
interface SubmitButtonWithModalProps {
  text: string;
  formData: Fields;
  setFormData: Dispatch<React.SetStateAction<Fields>>;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const SubmitButtonWithModal: React.FC<SubmitButtonWithModalProps> = ({
  text,
  formData,
  setFormData,
  handleSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
