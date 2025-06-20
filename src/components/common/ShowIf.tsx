import { FC } from "react";
import { PropsWithChildren } from "react";

const ShowIf: FC<PropsWithChildren<{ condition: boolean }>> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};
export default ShowIf;
