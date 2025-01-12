interface PatronIconProps {
  isPatron: boolean | null;
}

const PatronIcon: React.FC<PatronIconProps> = ({ isPatron }) => {
  return (
    isPatron && (
      <small className="icon text-orange-500 text-xl md:text-2xl ml-1">
        &#xe06c;
      </small>
    )
  );
};

export default PatronIcon;
