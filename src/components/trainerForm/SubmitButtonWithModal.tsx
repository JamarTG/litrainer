import { ReactNode, useState } from "react";
import TrainerForm from "./modals/TrainerForm";
import { Fields } from "../../types/form";
import { initialFormState } from "../../constants/form";
import useHandleSubmit from "../../hooks/useHandleSubmit";

interface SubmitButtonWithModalProps {
  children?: ReactNode;
}

const SubmitButtonWithModal: React.FC<SubmitButtonWithModalProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Fields>(initialFormState);

  const handleSubmit = useHandleSubmit(formData);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
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
        className="w-16 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
        aria-label="Create New Sesstion"
        onClick={handleToggleModal}
      >
        {children ? (
          <small className="font-bold underline">Click here to get puzzles</small>
        ) : (
          <span className="icon text-2xl">&#xe02d;</span>
        )}
      </button>
    </div>
  );
};

export default SubmitButtonWithModal;
