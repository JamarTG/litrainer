import { ChangeEvent, useState } from "react";
import { Fields } from "@/typing/interfaces";
import useHandleSubmit from "@/features/training-session/hooks/useHandleSubmit";

export const INITIAL_TRAINER_FORM_STATE: Fields = {
  username: "",
  maxNoGames: 10,
  startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  color: "both",
  gameTypes: ["bullet", "blitz", "rapid", "classical", "correspondence"],
  sort: "desc"
};

export const useTrainerFormState = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<Fields>(INITIAL_TRAINER_FORM_STATE);
  const handleSubmit = useHandleSubmit(formData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: Fields) => ({
      ...prevFormData,
      [name]: name === "maxNoGames" ? parseInt(value) : value
    }));
  };

  return {
    currentSlide,
    setCurrentSlide,
    formData,
    setFormData,
    handleInputChange,
    handleSubmit
  };
};