interface GameLinkProps {
    gameId: string
}

const GameLink: React.FC<GameLinkProps> = ({gameId}) => {
  return (
    <div className="flex justify-center items-center">
        <a
          href={`https://lichess.org/${gameId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="noto flex gap-1 items-center justify-center text-blue-500 "
        >
          <span className="icon text-xl hover:text-blue-500 ml-1">
            &#xe07a;
          </span>
          <small> View on Lichess</small>
        </a>
      </div>
  )
}

export default GameLink
