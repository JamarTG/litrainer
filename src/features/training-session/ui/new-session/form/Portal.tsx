import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal: FC<PortalProps> = ({ children }) => {
  return ReactDOM.createPortal(children, document.getElementById("modal-root") as HTMLElement);
};

export default Portal;
