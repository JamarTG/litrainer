interface IconButtonProps {
  onClick: () => void;
  direction: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, direction }) => {
  return (
    <button onClick={onClick} className="hover:opacity-75">
      {direction === "right" ? (
        <svg width="2em" height="2em" fill="white" viewBox="0 0 512 512">
          <path d="m190.06 414 163.12-139.78a24 24 0 0 0 0-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z" />
        </svg>
      ) : (
        <svg width="2em" height="2em" fill="white" viewBox="0 0 512 512">
          <path d="M321.94 98 158.82 237.78a24 24 0 0 0 0 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z" />
        </svg>
      )}
    </button>
  );
};

export default IconButton;
