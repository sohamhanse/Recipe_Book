
import { Outlet,useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";


function App() {
  const location = useLocation();
  const showNavbar = !["/", "/signup"].includes(location.pathname);
  return (
    <>
    {showNavbar && <Navbar/>}
    <Outlet/>
    </>
    );
}

export default App;