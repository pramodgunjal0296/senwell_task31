import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RoutesData from "./routes";

function App() {
  return (
    <div>
      <ToastContainer />
      <RoutesData />
    </div>
  );
}

export default App;
