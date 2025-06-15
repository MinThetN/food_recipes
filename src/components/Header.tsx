import { NavLink } from "react-router"

function Header() {
  return (
    <nav className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">M_Recipes</h1>
        <div className="flex gap-10 items-center text-lg font-medium">
            <NavLink to={"/"}>Recipes</NavLink>
            <NavLink to={"/about"}>About</NavLink>
        </div>
    </nav>
  )
}

export default Header
