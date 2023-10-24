import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import injectContext from "./store/context";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Tasks from "./views/Tasks";
import Profile from "./views/Profile";
import Othersprofile from "./views/Othersprofile";
import PrivateRoutes from "./utils/PrivateRoutes";
import Secretroute from "./views/Secretroute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otherprofile/:email" element={<Othersprofile />} />
        <Route path="/secretroute918yhi1uj" element={<Secretroute />} /> {/* This Route is for accessing a secret route to delete/update users */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default injectContext(App);