import { useState } from "react";
import TrainerForm from "../Universal/Modals/TrainerForm";
import { Fields } from "../../types/form";
import { INITIAL_FORM_STATE } from "../../constants";
import useHandleSubmit from "../../hooks/useHandleSubmit";

const SubmitButtonWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Fields>(INITIAL_FORM_STATE);

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
        onClick={handleToggleModal}
      >
        <span className="icon text-2xl">&#xe012;</span>
      </button>
    </div>
  );
};

export default SubmitButtonWithModal;
