import SubmitButtonWithModal from "../components/Form/SubmitButtomWithModal";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-700 flex flex-col justify-center min-h-screen p-4 gap-3 items-center">
      <div className="w-1/2 text-white text-xl p-4 text-center">
        This website is still under construction. Some functionalities have not
        been implemented. Click the button and use the default parameters on the
        modal to access and try the Playground. Use your Lichess username if you
        have one
      </div>
      <SubmitButtonWithModal  />
    </div>


  );
};

export default Home;
