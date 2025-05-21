import { ReactNode } from 'react';

interface BodyWrapperProps {
    children : ReactNode
}

const BodyWrapper: React.FC<BodyWrapperProps> = ({children}) => {
  return (
      <div className="relative min-h-screen">
        <main className="w-full min-h-screen">{children}</main>
      </div>
  );
};

export default BodyWrapper;
