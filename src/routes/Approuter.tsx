import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import MainLayout from '../layouts/mainlayout/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Categories from '../pages/Categories'
// import Product from '../pages/Products'
import AboutUs from '../pages/AboutUs'
import Error from '../pages/Error'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import Google from '../pages/Google'
import Profile from '../pages/Profile'
import ProtectedRouteAuth from '../componnents/Auth/ProtectedRouteAuth'




 
const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement:<Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "/cart" ,
          element: <Cart />
        },
        {
          path: "categories/products/:prefix",
          element: <Products />,
          loader: ({ params }) => {
            if (
              typeof params.prefix !== "string" ||
              !/^[a-z]+$/i.test(params.prefix)
            ) {
              throw new Response("Bad Request", {
                statusText: "Category not found",
                status: 400,
              });
            }
            return true;
          },
        },
        {
          path: "Apout-us",
          element: <AboutUs />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "google",
          element:<Google /> ,
        },
        {
          
          path: "profile",   
          element:
          <ProtectedRouteAuth>
          <Profile /> 
          </ProtectedRouteAuth>,
        },
      ],
    },
  ]);
  
  const AppRouter = () => {
    return <RouterProvider router={router} />;
  };
  
  export default AppRouter;