interface RatedOrCasualProps {
    rated : boolean
}

const RatedOrCasual: React.FC<RatedOrCasualProps> = ({rated}) => {
  return (
    <p>{(rated ? "Rated" : "Casual").toLocaleUpperCase()}</p>
  )
}

export default RatedOrCasual
