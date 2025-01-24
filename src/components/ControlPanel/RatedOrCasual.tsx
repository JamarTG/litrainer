interface RatedOrCasualProps {
    rated : boolean
}

const RatedOrCasual: React.FC<RatedOrCasualProps> = ({rated}) => {
  return (
    <p className="w-16">{(rated ? "Rated" : "Casual")}</p>
  )
}

export default RatedOrCasual
