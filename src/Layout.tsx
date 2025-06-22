import Footer from "./components/Footer"
import Header from "./components/Header"
import { Outlet, ScrollRestoration } from "react-router"

function Layout() {
  return (
    <section className="max-w-7xl mx-auto">
        <Header />
        <Outlet />
        <Footer />
        <ScrollRestoration />
    </section>
  )
}

export default Layout
