import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
} from "react";
import { Fields } from "../../../types/form";
import Swiper from "../../../components/ui/swiper/swiper";
import SlideOne from "../../../components/ui/modals/trainerForm/slide1";
import SlideTwo from "../../../components/ui/modals/trainerForm/slide2";
import Portal from "../../../components/ui/modals/portal";

interface ParamsFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: Fields;
  setFormData: Dispatch<SetStateAction<Fields>>;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}

const TrainerForm: React.FC<ParamsFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  formData,
  setFormData,
  handleSubmit,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
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
        <div
          className="fixed inset-0  flex justify-center items-center z-50  modal-backdrop"
          // onClick={handleOverlayClickCallback}
        >
          <div
            ref={modalRef}
            className={` py-4 w-[450px]  bg-primary border-[1.5px] border-tertiary rounded-xl  ${
              isModalOpen ? "fadeIn" : "animate-fadeOut"
            }`}
          >
            <div className="py-1">
              <div className="flex gap-4 px-4">
                <div className="bg-accent shadow-2xl rounded-md flex items-center justify-center border border-tertiary/80 w-fit p-3">
                  <svg
                    onClick={closeModal}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="20"
                    width="20"
                    className="mx-auto text-offWhite"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10.562 4.148a7.03 7.03 0 012.876 0l1.683-1.684 1.415 1.415-1.05 1.05A7.03 7.03 0 0118.326 8H21v2h-2.07c.046.327.07.66.07 1v1h2v2h-2v1c0 .34-.024.673-.07 1H21v2h-2.674a7 7 0 01-12.652 0H3v-2h2.07A7.06 7.06 0 015 15v-1H3v-2h2v-1c0-.34.024-.673.07-1H3V8h2.674a7.03 7.03 0 012.84-3.072l-1.05-1.05L8.88 2.465l1.683 1.684zM12 6a5 5 0 00-5 5v4a5 5 0 0010 0v-4a5 5 0 00-5-5zm-3 8h6v2H9v-2zm0-4h6v2H9v-2z" />
                  </svg>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <h1 className="text-offWhite text-lg font-bold">
                      Trainer form
                    </h1>
                    <button className="my-auto">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="text-offWhite"
                      >
                        <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-offWhite text-xs">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit
                  </p>
                </div>
              </div>
              <div className="pt-5">
                <div className="bg-tertiary w-full h-[1.5px]" />
              </div>
            </div>

            <div className="w-full h-full">
              <Swiper
                handleSubmit={handleSubmit}
                className="py-4 flex flex-col "
              >
                <SlideOne
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
                <SlideTwo handleInputChange={handleInputChange} />
                <SlideOne
                  formData={formData}
                  handleInputChange={handleInputChange}
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
