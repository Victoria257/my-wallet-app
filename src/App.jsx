import { MainPage } from "./pages/MainPage/MainPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster reverseOrder={true} />
      <MainPage />
    </div>
  );
}

export default App;
