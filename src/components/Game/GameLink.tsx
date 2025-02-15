interface GameLinkProps {
  gameId: string;
  moveNo: number;
}

const GameLink: React.FC<GameLinkProps> = ({ gameId, moveNo }) => {
  return (
    <div className="flex items-center gap-2">
     
      <a
        href={`https://lichess.org/${gameId}#${moveNo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-500 hover:text-blue-600 transition-colors duration-200"
      >
        {`/${gameId}#${moveNo}`}
      </a>
    </div>
  );
};

export default GameLink;