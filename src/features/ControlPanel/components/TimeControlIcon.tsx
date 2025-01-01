import { timeControlIcons } from "../../../constants";

interface TimeControlIconProps {
    timeControl : string 
}

const TimeControlIcon:React.FC<TimeControlIconProps> = ({timeControl}) => {
  return (
    <span
      className="icon text-4xl hover:text-blue-500"
      dangerouslySetInnerHTML={{
        __html: timeControlIcons[timeControl],
      }}
    ></span>
  );
};

export default TimeControlIcon;
