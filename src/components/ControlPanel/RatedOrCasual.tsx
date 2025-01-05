interface RatedOrCasualProps {
    rated : boolean
}

const RatedOrCasual: React.FC<RatedOrCasualProps> = ({rated}) => {
  return (
    <p className="w-16 bg-blue-900">{(rated ? "Rated" : "Casual").toLocaleUpperCase()}</p>
  )
}

export default RatedOrCasual
