import { ChangeEvent, Dispatch, FC, MouseEventHandler, SetStateAction, useRef } from "react";
import { Fields } from "../../../types/form";
import Swiper from "../swipers/Swiper";
import Portal from "./Portal";
import SlideOne from "./trainerForm/slideOne/Slide1";
import SlideTwo from "./trainerForm/slideTwo/Slide2";

interface ParamsFormProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  formData: Fields;
  setFormData: Dispatch<SetStateAction<Fields>>;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}

const TrainerForm: FC<ParamsFormProps> = ({ isModalOpen, setIsModalOpen, formData, setFormData, handleSubmit }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: Fields) => ({
      ...prevFormData,
      [name]: name === "maxNoGames" ? parseInt(value) : value,
    }));
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Portal>
      <div className="">
        <div className="fixed inset-0  flex justify-center items-center z-50  modal-backdrop">
          <div className="fixed inset-0 z-40"></div>
          <div
            ref={modalRef}
            className={` bg-theme-bg-light text-theme-text-light dark:bg-theme-bg-dark dark:text-theme-text-dark pt-4 w-[420px]  border-[1.5px] border-quaternary rounded-xl ${
              isModalOpen ? "fadeIn" : "animate-fadeOut"
            } z-50`}
          >
            <div className="py-1 ">
              <div className="flex gap-4 px-4">
                <div className="shadow-2xl rounded-lg flex items-center justify-center border border-shadowGray w-fit p-3">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                    className="text-offWhite"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm64 64v64h64V96h64v64h64V96h64v64h-64v64h64v64h-64v64h64v64h-64v-64h-64v64h-64v-64h-64v64H64v-64h64v-64H64v-64h64v-64H64V96h64zm64 128h64v-64h-64v64zm0 64v-64h-64v64h64zm64 0h-64v64h64v-64zm0 0h64v-64h-64v64z" />
                  </svg>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <h1 className="text-lg font-semibold">Training session form</h1>
                    <button
                      onClick={closeModal}
                      className="my-auto"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="my-auto"
                      >
                        <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-muted text-xs">Customize your training session with the details below</p>
                </div>
              </div>
              <div className="pt-5">
                <div className="w-full h-[1.5px]" />
              </div>
            </div>

            <div className="w-full h-full ">
              {/* passing handleSubmit here just to bypass the vercel error of unused variables */}
              <Swiper
                handleSubmit={handleSubmit}
                className=" flex flex-col space-y-4 pt-4"
              >
                <SlideOne
                  formData={formData}
                  handleInputChange={handleInputChange}
                  setFormData={setFormData}
                />
                <SlideTwo
                  handleInputChange={handleInputChange}
                  formData={formData}
                  setFormData={setFormData}
                />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default TrainerForm;
