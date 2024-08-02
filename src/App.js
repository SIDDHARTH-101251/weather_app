import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import WeatherMap from "./pages/WeatherMap";
import Chat from "./pages/Chat";
import "./App.css";

const App = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsSmallDevice(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {isSmallDevice && (
          <>
            <Route path="/map" element={<WeatherMap />} />
            <Route path="/chat" element={<Chat />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
