import { HomePage } from "./pages/HomePage/HomePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { MyGarden } from "./pages/MyGarden/MyGarden";
import { About } from "./pages/About/About";
import { Register } from "./components/User/Register/Register";
import styles from "./App.module.scss";
import { Login } from "./components/User/Login/Login";
import { Garden } from "./pages/Garden/Garden";
import { Navbar } from "./components/Navbar/Navbar";
import { CreateGarden } from "./components/CreateGarden/CreateGarden";

import { AuthProvider } from "./contexts/AuthContext";
import { useState } from "react";
import classNames from "classnames";
import { Footer } from "./components/Footer/Footer";

const AppContent = () => {
  const location = useLocation();
  const [color, setColor] = useState(false);

  return (
    <div className={styles.page}>
      <Navbar color={color} setColor={setColor} />
      <div
        className={classNames(styles.bodyContent, {
          [styles.paddingForNavbar]: color && location.pathname !== "/",
        })}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/myGarden" element={<MyGarden />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/myGarden/:id" element={<Garden />} />
          <Route path="/myGarden/create" element={<CreateGarden />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
