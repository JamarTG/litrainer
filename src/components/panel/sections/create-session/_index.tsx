import { useState } from "react";
import TrainerForm from "./session-form/TrainerForm";
import { Fields } from "@/types/form";
import { initialFormState } from "@/constants/form";
import useHandleSubmit from "@/hooks/useHandleSubmit";
import { PlusCircle } from "lucide-react";
import { ICON_SIZES } from "../../../constants";

const CreateNewSession = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Fields>(initialFormState);

  const handleSubmit = useHandleSubmit(formData);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
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
        <PlusCircle size={ICON_SIZES.MEDIUM} />
      </button>
    </>
  );
};

export default CreateNewSession;
