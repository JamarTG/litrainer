import { useState } from "react";
import TrainerForm from "./modals/TrainerForm";
import { Fields } from "../../types/form";
import { initialFormState } from "../../constants/form";
import useHandleSubmit from "../../hooks/useHandleSubmit";

const SubmitButtonWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Fields>(initialFormState);

  const handleSubmit = useHandleSubmit(formData);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
  <div
      style={{ width: "90%" }}
      className="pl-2 px-4 sm:px-0 p-2 border mx-auto rounded-lg  flex sm:flex-row items-center justify-center sm:items-start gap-4"
    >
      <div>

      </div>
       
      {isModalOpen && (
        <TrainerForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}

      <button className="flex justify-center items-center gap-2" onClick={handleToggleModal}>
        <small>Create new session</small>
        <span className="icon text-2xl">&#xe02d;</span>
      </button>
    </div>
  );
};

export default SubmitButtonWithModal;
