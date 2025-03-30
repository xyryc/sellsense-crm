import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <div className="bg-gray-100 dark:bg-gray-900">{children}</div>;
};

export default layout;
