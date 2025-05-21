import { ReactNode } from "react";

interface ListProps<T> {
  data: T[];
  renderFn: (data: T) => ReactNode;
}

const List = <T,>({ data, renderFn }: ListProps<T>) => {
  return (
    <>
      {data.map((item, index) => {
        <div key={index}>{renderFn(item)}</div>;
      })}
    </>
  );
};

export default List;
