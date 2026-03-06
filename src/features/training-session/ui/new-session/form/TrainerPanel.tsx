import { Dispatch, FC, SetStateAction } from "react";
import { ArrowLeft } from "lucide-react";
import Swiper from "../swipers/Swiper";
import SlideOne from "../slides/Slide1";
import SlideTwo from "../slides/Slide2";
import { useTrainerFormState } from "@/features/training-session/hooks/useTrainerFormState";
import { ICON_SIZES } from "@/constants/icons";
import Button from "@/components/shared/Button";

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
      <div className="h-10 flex items-center justify-between px-1">
        <Button
          type="button"
          onClick={() => setShowTrainer(false)}
          className="h-8 px-3 py-0 text-sm rounded-md"
          aria-label="Close new session"
        >
          <ArrowLeft size={ICON_SIZES.SMALL} />
          <span className="hidden xs:inline">Back</span>
        </Button>
        <h2 className="text-2xl uppercase tracking-wide text-[var(--color-muted)] font-extrabold">New Session</h2>
        <span className="w-8" />
      </div>
      <div className="flex flex-1 justify-center items-start pt-2">
        <div className="w-full max-w-md rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 space-y-3 text-sm min-h-[350px]">
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
