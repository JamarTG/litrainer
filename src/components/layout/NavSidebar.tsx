/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import React, { useState } from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import ThemeChanger from "../ThemeChanger";

export const NavSidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  return (
    <React.Fragment>

      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 opacity-50 lg:hidden transition-opacity ${isSidebarOpen ? "block" : "hidden"}`}
      />

      <div className="lg:hidden absolute right-0 p-4 z-40">
        <button
          className="btn-menu"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          type="button"
          aria-label="Toggle sidebar"
        >
          <Icon
            name="burger"
            className="w-6 h-6"
          />
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-52 overflow-y-auto bg-white dark:bg-gray-500 border-r-2 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex justify-center items-center py-6">
          <img
            src="/litrainer-logo.png"
            alt="LiTrainer Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            if (itemId !== "#") {
              window.location.href = itemId;
            }
          }}
          items={[
            {
              title: "Playground",
              itemId: "/",
              elemBefore: () => (
                <Icon
                  name="settings"
                  className="pointer-events-none"
                />
              ),
            },
            {
              title: "Settings",
              itemId: "/settings",
              elemBefore: () => (
                <Icon
                  name="settings"
                  className="pointer-events-none"
                />
              ),
            },
          ]}
        />

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Donate button */}
        <div className="px-4 py-3">
          <button
            onClick={() => (window.location.href = "/donate")}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition-none"
          >
            ❤️ Donate
          </button>
        </div>

        {/* Theme toggle icon */}
        <div className="px-4 pb-4 flex justify-center border">
          <ThemeChanger />
        </div>
      </div>
    </React.Fragment>
  );
};
