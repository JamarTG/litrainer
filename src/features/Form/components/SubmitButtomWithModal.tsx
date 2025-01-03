import React, { useState } from 'react';
import TrainerForm from '../../../components/ui/Modals/TrainerForm';
interface SubmitButtonWithModalProps {
  formData: any;
  setFormData: (data: any) => void;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const SubmitButtonWithModal: React.FC<SubmitButtonWithModalProps> = ({ formData, setFormData, handleSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button
        onClick={handleToggleModal}
        className="whitespace-nowrap h-fit w-full items-center justify-center rounded-lg text-white shadow-xs px-[calc(theme(spacing[5])-1px)] py-[calc(theme(spacing[3])-1px)] cursor-pointer bg-accent transition duration-150 hover:border-accent text-sm"
      >
        Fetch New Puzzles
      </button>
      {isModalOpen && (
        <TrainerForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default SubmitButtonWithModal;