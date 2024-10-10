import { HomePage } from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MyGarden } from "./components/MyGarden/MyGarden";
import { About } from "./components/About/About";
import { Register } from "./components/User/Register/Register";
import { Header } from "./components/Header/Header";
import { Login } from "./components/User/Login/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myGarden" element={<MyGarden />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
