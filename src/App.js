import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import HEader from "./components/HEader";
import Footer from "./components/Footer";

function App() {
  return (
    <div className=" homescroll App overflow-hidden">
      <HEader />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

export default App;
