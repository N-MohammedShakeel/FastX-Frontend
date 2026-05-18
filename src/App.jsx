import PublicRoutes from "./router/PublicRoutes";
import PassengerRoutes from "./router/PassengerRoutes";
import { Routes } from "react-router-dom";
import OperatorRoutes from "./router/OperatorRoutes";
import AdminRoutes from "./router/AdminRoutes";

const App = () => {
  return (
    <>
      <PublicRoutes />
      <PassengerRoutes />
      <OperatorRoutes />
      <AdminRoutes />
    </>
  );
};

export default App;
