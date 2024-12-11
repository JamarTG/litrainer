const Help = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          How Does It Work?
        </h1>

        <div className="mb-8">
          <div className="flex flex-col justify-center items-center md:flex-row mb-8 gap-8 rounded-md border-4 border-gray-800">
            <div className="md:w-1/2 p-3">
              <div className="flex items-center justify-center h-full">
                <i className="mb-2">
                  After playing a game, click on the Analysis board button.
                </i>
              </div>
            </div>
            <div className="md:w-1/2 p-3">
              <img src="/computer.png" alt="analyze-png" />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:flex-row mb-8 gap-8 rounded-md border-4 border-gray-800">
            <div className="md:w-1/2 md:order-2 p-3">
              <i className="mb-2">
                Then, at the bottom of the analysis page, click Request a
                computer analysis:
              </i>
            </div>
            <div className="md:w-1/2 md:order-1 p-3">
              <img src="/analyze.png" alt="request-computer-analysis" />
            </div>
          </div>

          <p> You can expect those games to be available in the time period in which you created those sessions</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
