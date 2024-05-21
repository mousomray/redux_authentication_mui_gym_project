import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
import { check_token } from './Auth/authslice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import Service from './Pages/Service';
import Servicedetails from './Pages/Servicedetails';
import Blog from './Pages/Blog';
import Blogdetails from './Pages/Blogdetails';
import Booking from './Pages/Booking';
import Contact from './Pages/Contact';

const App = () => {

  const dispatch = useDispatch();
  //check token avable or not
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

  const private_routing = [

    {
      path: '/service',
      component: <Service />
    },
    {
      path: '/servicedetails/:id',
      component: <Servicedetails />
    },
    {
      path: '/blog',
      component: <Blog />
    },
    {
      path: '/blogdetails/:id',
      component: <Blogdetails />
    },
    {
      path: '/booking/:id',
      component: <Booking />
    },
    {
      path: '/contact',
      component: <Contact />
    }
  ]

  const public_routing = [

    {
      path: '/',
      component: <Home />
    },
    {
      path: '/register',
      component: <Register />
    },
    {
      path: '/login',
      component: <Login />
    }
  ]

  // This step is required for to stop page refreshing problem in logout button
  useEffect(() => {
    dispatch(check_token())
  }, [])

  return (
    <>
      <ToastContainer />

      <Router>
        <Routes>

          {/*Private Routing Area*/}
          {private_routing?.map((routing) => {
            return (
              <>
                <Route path={routing?.path} element={<PrivateRoute>{routing?.component}</PrivateRoute>} />
              </>
            )
          })}

          {/*Public Routing Area*/}
          {public_routing?.map((routing) => {
            return (
              <>
                <Route path={routing?.path} element={routing?.component} />
              </>
            )
          })}

        </Routes>
      </Router>
    </>
  )
}

export default App
