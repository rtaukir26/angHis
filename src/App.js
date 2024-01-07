import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Login from "./pages/Login/Login";
import routePaths from "./routes/routhPaths";

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
    // window.addEventListener("online", triggerOfflineSyncData);
    // // Checking and updating the expired service sessions and setting timeout for incomplete service sessions
    // updateExpiredServiceSessions();
    // // cleanup the event listeners
    // return () => {
    //    window.removeEventListener("online", triggerOfflineSyncData);
    // };
  }, []);
  return (
    // <div className="App">
    //   {/* <Home /> */}
    //   <Login />
    // </div>
    <Router>
      <Routes>
        <Route exact path={routePaths.root} element={<Home />} />
        <Route exact path={routePaths.login} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
