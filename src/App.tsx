import "./index.css";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row pt-2">
        <Sidebar />
        <MainContent />
      </div>
    </>
  );
}

export default App;
