import { Fragment } from "react/jsx-runtime";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return <Fragment>{items.map(renderItem)}</Fragment>;
};

export default List;
