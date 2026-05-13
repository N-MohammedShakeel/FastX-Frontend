import React from "react";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import OAuthSuccess from "../pages/OAuthSuccess";
import { Routes, Route } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
