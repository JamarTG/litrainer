interface GameLinkProps {
  gameId: string;
  moveNo: number;
}

const GameLink: React.FC<GameLinkProps> = ({ gameId, moveNo }) => {
  return (
    <div className="flex justify-center items-center">
      <a
        href={`https://lichess.org/${gameId}#${moveNo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="noto flex gap-1 items-center justify-center text-blue-500"
      >
        <span className="icon text-xl hover:text-blue-500 ml-1">
          &#xe07a;
        </span>
        <small>View on Lichess</small>
      </a>
    </div>
  );
};

export default GameLink;