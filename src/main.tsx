import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './Layout'
import Home from './pages/Home'
import About from './pages/About'
import Recipe from './pages/Recipe'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // same with path: '/'
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/recipes/:id',
        element: <Recipe />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
