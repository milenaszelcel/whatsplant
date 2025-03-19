import { HomePage } from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MyGarden } from "./pages/MyGarden/MyGarden";
import { About } from "./pages/About/About";
import { Register } from "./components/User/Register/Register";
import styles from "./App.module.scss";
import { Login } from "./components/User/Login/Login";
import { Garden } from "./pages/Garden/Garden";
import { Navbar } from "./components/Navbar/Navbar";
import { CreateGarden } from "./components/CreateGarden/CreateGarden";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className={styles.bodyContent}>
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
      </Router>
    </AuthProvider>
  );
}

export default App;
