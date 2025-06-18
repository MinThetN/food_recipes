import { NavLink } from "react-router"

function Header() {
  return (
    <nav className="flex items-center justify-between my-10 border-b border-gray-300 pb-5">
        <h1 className="text-3xl font-bold"><span className="text-green-500">M </span>Recipes</h1>
        <div className="flex gap-10 items-center text-lg font-medium">
            <NavLink to={"/"} className={({ isActive }) => (isActive ? "text-black bg-green-200 px-2 py-1 rounded-lg" : "hover:bg-green-100 px-2 py-1 rounded-lg")}>Recipes</NavLink>
            <NavLink to={"/about"} className={({ isActive }) => (isActive ? "text-black bg-green-200 px-2 py-1 rounded-lg" : "hover:bg-green-100 px-2 py-1 rounded-lg")}>About</NavLink>
        </div>
    </nav>
  )
}

export default Header
