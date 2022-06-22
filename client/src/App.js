import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { RoutesApplication } from "RoutingApplication";

const App = () => (
  <Router>
    <RoutesApplication />;
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
  </Router>
);

export default App;
