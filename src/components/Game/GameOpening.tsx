interface GameOpeningProps {
    eco: string;
    name: string;
  }
  
  const GameOpening: React.FC<GameOpeningProps> = ({ eco, name }) => {
    return (
      <p className="text-blue-500 p-1 truncate cursor-pointer" title={`${eco} ${name}`}>
        {eco} {name}
      </p>
    );
  };
  
  export default GameOpening;
  