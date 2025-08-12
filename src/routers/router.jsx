import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Register from "../components/Register"
import Login from "../components/Login"
import CartPage from "../pages/home/books/CartPage";
import CheckoutPage from "../pages/home/books/CheckoutPage";
import SingleBook from "../pages/home/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/home/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";


const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element:<PrivateRoute><OrderPage/></PrivateRoute>
        },
        {
            path: "/about",
            element: <div>About</div>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/cart",
          element:<CartPage/>
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        }
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin/>
  },
  {
    path: "/dashboard",
    element: <AdminRoute>
      <DashboardLayout/>
    </AdminRoute>,
    children: [
      {
        path: "",
        element: <AdminRoute><Dashboard/></AdminRoute>
      },
      {
        path: "add-new-book",
        element: <AdminRoute><AddBook/></AdminRoute>
      },
      {
        path: "edit-book/:id",
        element: <AdminRoute><UpdateBook/></AdminRoute>
      },
      {
        path: "manage-books",
        element: <AdminRoute><ManageBooks/></AdminRoute>
      }
    ]
  }
]);
export default router;
