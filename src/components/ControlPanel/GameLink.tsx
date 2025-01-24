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
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
          <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" />
          <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" />
        </svg>
        Game
      </a>
    </div>
  );
};

export default GameLink;
