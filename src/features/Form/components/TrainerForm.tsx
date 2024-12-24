import { ChangeEvent, Dispatch,MouseEventHandler, SetStateAction } from "react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fields } from "../../../types/form";

interface ParamsFormProps {
  formData: Fields;
  setFormData: Dispatch<SetStateAction<Fields>>;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}

const TrainerForm: React.FC<ParamsFormProps> = ({
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

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form className="trainer-form p-6 rounded-lg max-w-md w-full ">
        <h1 className="text-2xl pb-5">Training Session Form</h1>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="maxNoGames">Max Number of Games</label>
          <input
            type="number"
            id="maxNoGames"
            name="maxNoGames"
            value={formData.maxNoGames}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label>Choose Time Period</label>
          <div className="flex justify-between mb-4">
            <div className="relative w-1/2 pl-2">
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary text-white hide-calendar-icon"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-gray-400 z-10"
                />
              </div>
            </div>
            <div className="relative w-1/2 pl-2">
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary text-white hide-calendar-icon"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-gray-400 z-10"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-primary py-2 rounded hover:bg-primary-dark"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TrainerForm;
