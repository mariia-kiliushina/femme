type Props = {
  condition: boolean;
  children: React.ReactNode[] | React.ReactNode;
  wrapper(children: React.ReactNode[] | React.ReactNode): JSX.Element;
};

export const ConditionalWrapper = ({condition, children, wrapper}: Props) => {
  return condition ? wrapper(children) : <>{children}</>;
};
