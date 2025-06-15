import Footer from "./components/Footer"
import Header from "./components/Header"
import { Outlet } from "react-router"

function Layout() {
  return (
    <section className="max-w-7xl mx-auto bg-green-100">
        <Header />
        <Outlet />
        <Footer />
    </section>
  )
}

export default Layout
