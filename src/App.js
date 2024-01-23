import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import PrivateRoutes from "./routes/PrivateRoutes";
import routePaths from "./routes/routePaths";

function App() {
  useEffect(() => {
    const themeChangeValue = localStorage.getItem("theme-mode");
    if (themeChangeValue === "dark-theme") {
      document.getElementsByTagName("body")[0].classList.add("dark-theme");
      document.getElementsByTagName("body")[0].classList.remove("light-theme");
    } else {
      document.getElementsByTagName("body")[0].classList.remove("dark-theme");
      document.getElementsByTagName("body")[0].classList.add("light-theme");
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default Redirect */}
        <Route exact path={routePaths.login} element={<Login />} />

        {/* Protected Routes */}
        <Route path={routePaths.root} element={<PrivateRoutes />}>
          <Route exact path={routePaths.home} element={<Home />} />
          <Route exact path={routePaths.about} element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
