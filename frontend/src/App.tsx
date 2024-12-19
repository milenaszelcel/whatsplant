import { HomePage } from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MyGarden } from "./components/MyGarden/MyGarden";
import { About } from "./components/About/About";
import { Register } from "./components/User/Register/Register";
import styles from "./App.module.scss";
import { Login } from "./components/User/Login/Login";
import { Garden } from "./components/Garden/Garden";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.bodyContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/myGarden" element={<MyGarden />} />i
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myGarden/:id" element={<Garden />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
