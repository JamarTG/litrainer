import { PropsWithChildren } from "react";

const NavbarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section>
      <nav className="bg-red-500 flex justify-between">
        <div className="text-2xl">
          <img src="" alt="" />
          Powered By Lichess API
        </div>
        <div>
          <ul>
            <li>
              <a href="">github source code</a>
            </li>
          </ul>
        </div>
      </nav>
      <main>{children}</main>
    </section>
  );
};

export default NavbarLayout;
