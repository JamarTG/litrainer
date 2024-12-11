import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainerForm from "../components/home/TrainerForm";

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    maxNoGames: 0,
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      navigate("/trainer", { state: { puzzles: [] } });
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <div>
      <TrainerForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
