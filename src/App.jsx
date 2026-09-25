import { Routes, Route, Navigate } from "react-router";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NewArrivals from "./pages/NewArrivals";
import BestSellers from "./pages/BestSellers";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import About from "./pages/About";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Orders from "./pages/dashboard/Orders";
import Saved from "./pages/dashboard/Saved";
import Messages from "./pages/dashboard/Messages";
import Profile from "./pages/dashboard/Profile";
import Addresses from "./pages/dashboard/Addresses";
import Settings from "./pages/dashboard/Settings";

import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ==================================================
          PUBLIC STORE ROUTES
      ================================================== */}

      <Route path="/" element={<Home />} />

      <Route path="/shop" element={<Shop />} />

      <Route
        path="/new-arrivals"
        element={<NewArrivals />}
      />

      <Route
        path="/best-sellers"
        element={<BestSellers />}
      />

      <Route path="/search" element={<Search />} />

      <Route
        path="/product/:slug"
        element={<Product />}
      />

      <Route path="/categories/:category" 
      element={<Category />}
       />

      <Route
      path="/about"
      element={<About/>}
      />

      <Route
      path="/contact"
      element={<Contact/>}
      />


      {/* ==================================================
          CART / CHECKOUT
      ================================================== */}

      <Route path="/cart" element={<Cart />} />

      <Route path="/checkout" element={<Checkout />} />

      <Route
        path="/track-order/"
        element={<TrackOrder />}
      />

      {/* ==================================================
          AUTHENTICATION
      ================================================== */}

      <Route
        path="/sign-in"
        element={<SignIn />}
      />

      <Route
        path="/sign-up"
        element={<SignUp />}
      />

      {/* ==================================================
          USER DASHBOARD
      ================================================== */}
      <Route element={<ProtectedRoute/>}>
         <Route
        path="/dashboard"
        element={<DashboardLayout />}
      >
        {/* /dashboard */}
        <Route
          index
          element={
            <Navigate
              to="/dashboard/overview"
              replace
            />
          }
        />

        {/* /dashboard/overview */}
        <Route
          path="overview"
          element={<Overview />}
        />

        {/* /dashboard/orders */}
        <Route
          path="orders"
          element={<Orders />}
        />

        {/* /dashboard/saved */}
        <Route
          path="saved"
          element={<Saved />}
        />

        {/* /dashboard/messages */}
        <Route
          path="messages"
          element={<Messages />}
        />

        {/* /dashboard/profile */}
        <Route
          path="profile"
          element={<Profile />}
        />

        {/* /dashboard/addresses */}
        <Route
          path="addresses"
          element={<Addresses />}
        />

        {/* /dashboard/settings */}
        <Route
          path="settings"
          element={<Settings />}
        />
      </Route>
      </Route>

      {/* ==================================================
          404
      ================================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;
