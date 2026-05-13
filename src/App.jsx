import PublicRoutes from "./router/PublicRoutes";
import PassengerRoutes from "./router/PassengerRoutes";
import { Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <PublicRoutes />
      <PassengerRoutes />
    </>
  );
};

export default App;
