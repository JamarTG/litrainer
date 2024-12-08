import React from 'react';

type FeedbackMessageProps = {
  message: React.ReactNode;
};

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className={`feedback-message ${message ? "fade-out" : ""} absolute inset-0 flex items-center justify-center text-6xl`}
      style={{
        zIndex: 10,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {message}
    </div>
  );
};

export default FeedbackMessage;