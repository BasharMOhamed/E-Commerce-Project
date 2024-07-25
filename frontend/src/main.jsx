import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./Pages/Auth/Login";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import AdminRoute from "./Pages/Admin/AdminRoute.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { lazy, Suspense } from "react";

const Register = lazy(() => import("./Pages/Auth/Register.jsx"));
const Profile = lazy(() => import("./Pages/User/Profile.jsx"));
const UserList = lazy(() => import("./Pages/Admin/UserList.jsx"));
const CategoryList = lazy(() => import("./Pages/Admin/CategoryList.jsx"));
const ProductList = lazy(() => import("./Pages/Admin/ProductList.jsx"));
const AllProduct = lazy(() => import("./Pages/Admin/AllProduct.jsx"));
const ProductUpdate = lazy(() => import("./Pages/Admin/ProductUpdate.jsx"));
const Home = lazy(() => import("./Home.jsx"));
const Favorites = lazy(() => import("./Pages/Products/Favorites.jsx"));
const ProductDetails = lazy(() =>
  import("./Pages/Products/ProductDetails.jsx")
);

const Cart = lazy(() => import("./Pages/Cart.jsx"));
const Shop = lazy(() => import("./Pages/Shop.jsx"));
const Shipping = lazy(() => import("./Pages/Orders/Shipping.jsx"));
const PlaceOrder = lazy(() => import("./Pages/Orders/PlaceOrder.jsx"));
const Order = lazy(() => import("./Pages/Orders/Order.jsx"));
const UserOrder = lazy(() => import("./Pages/User/UserOrder.jsx"));
const OrderList = lazy(() => import("./Pages/Admin/OrderList.jsx"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element={
          <Suspense>
            <Register />
          </Suspense>
        }
      />
      <Route
        index={true}
        path="/"
        element={
          <Suspense>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/favorite"
        element={
          <Suspense>
            <Favorites />
          </Suspense>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Suspense>
            <ProductDetails />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense>
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="/shop"
        element={
          <Suspense>
            <Shop />
          </Suspense>
        }
      />
      <Route
        path="/user-orders"
        element={
          <Suspense>
            <UserOrder />
          </Suspense>
        }
      />

      <Route path="" element={<PrivateRoute />}>
        <Route
          path="/profile"
          element={
            <Suspense>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/shipping"
          element={
            <Suspense>
              <Shipping />
            </Suspense>
          }
        />
        <Route
          path="/placeOrder"
          element={
            <Suspense>
              <PlaceOrder />
            </Suspense>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Suspense>
              <Order />
            </Suspense>
          }
        />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route
          path="userlist"
          element={
            <Suspense>
              <UserList />
            </Suspense>
          }
        />
        <Route
          path="categorylist"
          element={
            <Suspense>
              <CategoryList />
            </Suspense>
          }
        />
        <Route
          path="productlist"
          element={
            <Suspense>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="allproductslist"
          element={
            <Suspense>
              <AllProduct />
            </Suspense>
          }
        ></Route>
        <Route
          path="product/update/:_id"
          element={
            <Suspense>
              <ProductUpdate />
            </Suspense>
          }
        />
        <Route
          path="orderlist"
          element={
            <Suspense>
              <OrderList />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense>
              <AdminDashboard />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
