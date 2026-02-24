import { Dispatch, FC, SetStateAction } from "react";
import Swiper from "../swipers/Swiper";
import SlideOne from "../slides/Slide1";
import SlideTwo from "../slides/Slide2";
import { useTrainerFormState } from "@/features/training-session/hooks/useTrainerFormState";

interface TrainerPanelProps {
  setShowTrainer: Dispatch<SetStateAction<boolean>>;
}

const TrainerPanel: FC<TrainerPanelProps> = ({ setShowTrainer }) => {
  const { currentSlide, setCurrentSlide, formData, setFormData, handleInputChange, handleSubmit } = useTrainerFormState();

  return (
    <div
      style={{ zIndex: 100 }}
      className="absolute inset-0 w-full min-h-[499px] bg-[var(--color-surface-strong)] text-[var(--color-fg)] p-3 flex flex-col animate-fade-in"
    >
      <div className="h-10 flex items-center justify-between px-1 mb-2">
        <button
          onClick={() => setShowTrainer(false)}
          className="flex items-center justify-center h-8 w-8 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          aria-label="Close trainer form"
        >
          <span className="text-xl font-bold">×</span>
        </button>
        <h2 className="text-4xl uppercase tracking-wide text-[var(--color-muted)] font-extrabold">New Session</h2>
        <span className="w-8" />
      </div>
      <div className="flex flex-1 justify-center items-start pt-2">
        <div className="w-full max-w-md rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-4 min-h-[350px]">
          <Swiper
            handleSubmit={(event) => {
              handleSubmit(event);
              setShowTrainer(false);
            }}
            className="flex flex-col space-y-4 pt-4 min-h-[300px]"
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          >
            <SlideOne formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />
            <SlideTwo handleInputChange={handleInputChange} formData={formData} setFormData={setFormData} />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TrainerPanel;
