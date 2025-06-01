import { useState } from "react";
import TrainerForm from "./modals/TrainerForm";
import { Fields } from "../../types/form";
import { initialFormState } from "../../constants/form";
import useHandleSubmit from "../../hooks/useHandleSubmit";
import { PlusCircle } from "lucide-react";

const SubmitButtonWithModal = () => {
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
        aria-label="Create New Session"
        title="Create New Session"
        onClick={handleToggleModal}
      >
        <PlusCircle size={25} />
      </button>
    </div>
  );
};

export default SubmitButtonWithModal;
