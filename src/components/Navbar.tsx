import { Link, NavLink, useNavigate } from "react-router-dom"
import { useGeneralStore } from "../store/useGeneralStore";
import UserAvatar from "./UserAvatar";
import { use } from "react";


function Navbar() {

  const user = useGeneralStore((state) => state.user);
  const navigate = useNavigate();

  const handleClickAvatar = () => {
    navigate("/profile");
  }

  return (
    <>
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-lg font-bold">Tasker</Link>
        <div className="flex items-center gap-2">
          <NavLink to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>

          {user ? (
            <>
              <NavLink to="/add" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Task</NavLink>
              <NavLink to="/done" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Favoritas</NavLink>
              <span onClick={() => useGeneralStore.getState().logout()} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</span>
              <NavLink to="/profile" className="text-gray-300 hover:text-white  py-2 rounded-md "><UserAvatar handleAvatarClick={handleClickAvatar} isInNavbar={true}/></NavLink>
            </>
          ) : (
            <NavLink to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</NavLink>
          )}
         
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar