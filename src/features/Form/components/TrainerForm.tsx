import { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction } from "react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fields } from "../../../types/form";
import { timeControlIcons } from "../../../constants";

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "maxNoGames" ? parseInt(value) : value,
    }));
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "both" || value === "black" || value === "white") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        color: value,
      }));
    }
  };

  const handleCheckboxChange = (gameType: string) => {
    setFormData((prevFormData) => {
      const updatedGameTypes = prevFormData.gameTypes.includes(gameType)
        ? prevFormData.gameTypes.filter((type) => type !== gameType)
        : [...prevFormData.gameTypes, gameType];
      return {
        ...prevFormData,
        gameTypes: updatedGameTypes,
      };
    });
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

        {/* game speeds*/}
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex flex-wrap gap-4">
            {["correspondence", "classical", "rapid", "blitz", "bullet"].map(
              (gameType) => (
                <label key={gameType} className="flex items-center space-x-2 ">
                  <span
                    className="icon text-xl hover:text-blue-500 ml-1"
                    dangerouslySetInnerHTML={{
                      __html: timeControlIcons[gameType],
                    }}
                  />

                  <input
                    type="checkbox"
                    value={gameType}
                    checked={formData.gameTypes.includes(gameType)}
                    onChange={() => handleCheckboxChange(gameType)}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                </label>
              )
            )}
          </div>
        </div>

        {/* player color */}
        <div className="flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="color"
              value="white"
              checked={formData.color === "white"}
              onChange={handleColorChange}
              className="form-radio h-5 w-5 text-primary"
            />
            <span className="text-gray-700">White</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="color"
              value="black"
              checked={formData.color === "black"}
              onChange={handleColorChange}
              className="form-radio h-5 w-5 text-primary"
            />
            <span className="text-gray-700">Black</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="color"
              value="both"
              checked={formData.color === "both"}
              onChange={handleColorChange}
              className="form-radio h-5 w-5 text-primary"
            />
            <span className="text-gray-700">Both</span>
          </label>
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
