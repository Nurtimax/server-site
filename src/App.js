import React from "react";
import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>

      <Outlet />
    </>
  );
}

export default App;
