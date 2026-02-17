import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6 bg-amber-200">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
