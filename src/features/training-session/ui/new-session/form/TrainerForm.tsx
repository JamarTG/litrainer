import { Dispatch, FC, SetStateAction, useRef } from "react";
import Swiper from "./swipers/Swiper";
import Portal from "./Portal";
import SlideOne from "./slides/slide-one/Slide1";
import SlideTwo from "./slides/slide-two/Slide2";
import FormHeader from "./FormHeader";
import { useTrainerFormState } from "@/features/training-session/hooks/useTrainerFormState";

interface ParamsFormProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const TrainerForm: FC<ParamsFormProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { currentSlide, setCurrentSlide, formData, setFormData, handleInputChange, handleSubmit } = useTrainerFormState();

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isModalOpen) return;

  return (
    <Portal>
      <div style={{ zIndex: 70 }} className="fixed inset-0  flex justify-center items-center modal-backdrop">
        <div className="fixed inset-0 z-40"></div>
        <div
          ref={modalRef}
          className={`m-10 bg-white min-w-[350px] dark:bg-zinc-900 pt-4 w-[420px]  border-[1.5px] border-quaternary rounded-xl ${
            isModalOpen ? "fadeIn" : "animate-fadeOut"
          } z-50`}
        >
          <FormHeader closeModal={closeModal} />

          <div className="w-full h-full ">
            <Swiper
              handleSubmit={(event) => {
                handleSubmit(event);
                closeModal();
              }}
              className=" flex flex-col space-y-4 pt-4"
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            >
              <SlideOne formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />
              <SlideTwo handleInputChange={handleInputChange} formData={formData} setFormData={setFormData} />
            </Swiper>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default TrainerForm;
