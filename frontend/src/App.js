import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import OpenRoute from "./components/OpenRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./pages/Error";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useState } from "react";
import  MyProfile from "../src/components/Dashboard/MyProfile"
import  Settings from "./components/Dashboard/Settings"
import UpdateMedicine from "./components/Dashboard/Medicine/UpdateMedicine";
import AddDeletemedicine from "./components/Dashboard/Medicine/AddDeletemedicine";
// import  MyMedicine from "./components/Dashboard/Medicine/MyMedicine";
import Mymedicinee from "./components/Dashboard/Medicine/MyMedicinee";
import SearchMedicine from "./components/Dashboard/Medicine/SearchMedicine";
import  About from "../src/pages/About";
import CustomerSignup from "./components/CustomerSignup";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen h-screen flex flex-col bg-richblack-900 font-family: cursive ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="Customersignup"
          element={
            <OpenRoute>
              <CustomerSignup/>
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.ADMIN &&(
              <>
              <Route path="dashboard/update-medicine" element={<UpdateMedicine/>}></Route>
              <Route path="dashboard/add-delete-medicine" element={<AddDeletemedicine/>}></Route>
              <Route path="dashboard/my-medicine" element={<Mymedicinee/>}></Route>
              </>
            )
          }

          {/* {
            user.accountType !== ACCOUNT_TYPE.ADMIN && (
              <>
                <Route path="dashboard/search-medicine" element={<SearchMedicine/>}></Route>
              </>
            )
          } */}
          <Route path="dashboard/search-medicine" element={<SearchMedicine/>}></Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
