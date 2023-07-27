import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PgFOF from './Components/PgFOF';
import Cart from './Components/Cart';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Addproduct from './Components/Addproduct';
import Category from './Components/Category';
import Singleproduct from './Components/Singleproduct';
import Wishlist from './Components/wishlist/Wishlist';
import Checkout from './Components/Checkout';
import Footer from './Components/footer/Footer';
import System from './Components/System';

function App() {
  const Layout = () => {
    return <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: (<Layout />),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/cart',
          element: <Cart />
        },
        {
          path: '/userprofile',
          element: <Profile />
        },
        {
          path: '/wishlist',
          element: <Wishlist />
        },
        {
          path: '/category/:id',
          element: <Category />
        },
        {
          path: '/product/:id',
          element: <Singleproduct />
        },
        {
          path: '/checkout',
          element: <Checkout />
        },
        {
          path: '/sellproduct',
          element: <Addproduct />
        },
        {
          path : '/system',
          element : <System/>
        },
        {
          path: '*',
          element: <PgFOF />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
