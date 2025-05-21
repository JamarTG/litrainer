import { ReactNode } from "react";

import { NavSidebar } from "./NavSidebar";
import BodyWrapper from "./BodyWrapper";

interface DashboardLayoutProps {
    children : ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <BodyWrapper>
      <div className="flex h-screen bg-gray-200">
        <NavSidebar />

        <div className="w-full">
          <main className="content">
            <section className="sm:flex-row flex flex-col justify-center items-center h-full flex-1">
              <div
                className="flex flex-col justify-center items-center h-screen"
            
              >
                {children}
              </div>
            </section>
          </main>
        </div>
      </div>
    </BodyWrapper>
  );
};
