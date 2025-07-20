import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CheckAuth from './components/check-auth.jsx'
import Tickets from './pages/tickets.jsx'
import TicketDetailsPages from './pages/ticket.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Admin from './pages/admin.jsx'
import Navbar from './components/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <div className='flex flex-col items-center justify-centerh-fit'>
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route
          path='/'
          element={
            <CheckAuth protectedRoute={true}>
              <Tickets />
            </CheckAuth>
          }
        >
        </Route>
        <Route
          path='/ticket/:id'
          element={
            <CheckAuth protectedRoute={true}>
              <TicketDetailsPages />
            </CheckAuth>
          }
        >
        </Route>
        <Route
          path='/login'
          element={
            <CheckAuth protectedRoute={false}>
              <Login />
            </CheckAuth>
          }
        >
        </Route>
        <Route
          path='/signup'
          element={
            <CheckAuth protectedRoute={false}>
              <Signup />
            </CheckAuth>
          }
        >
        </Route>
        <Route
          path='/admin'
          element={
            <CheckAuth protectedRoute={true}>
              <Admin />
            </CheckAuth>
          }
        >
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
  </div>
)
