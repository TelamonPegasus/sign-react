import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { RoutesApp } from "RoutingApp";

const App = () => (
  <>
    <RoutesApp />;
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
);

export default App;
