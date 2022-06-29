import { MainNavigation } from "./Navigation";

const { Outlet } = require("react-router-dom");

export const LayoutContainer = () => {
  return (
    <main className="App">
      <MainNavigation />

      <Outlet />
    </main>
  );
};
