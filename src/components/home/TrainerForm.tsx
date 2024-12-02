import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { Models } from "../../typings";

interface ParamsFormProps {
  formData: Models.Form.FormData;
  setFormData: Dispatch<SetStateAction<Models.Form.FormData>>;
  handleSubmit: (event: FormEvent<HTMLButtonElement>) => void;
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
    <div className="flex justify-center items-center min-h-screen">
      <form className="bg-darkBackground p-6 rounded-lg shadow-md text-white max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maxNoGames" className="block text-sm font-medium mb-2">
            Max Number of Games
          </label>
          <input
            type="number"
            id="maxNoGames"
            name="maxNoGames"
            value={formData.maxNoGames}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium mb-2">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium mb-2">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button onClick={handleSubmit} className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TrainerForm;