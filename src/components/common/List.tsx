interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return <>{items.map(renderItem)}</>;
};

export default List;
