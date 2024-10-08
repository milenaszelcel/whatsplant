import { HomePage } from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MyGarden } from "./components/MyGarden/MyGarden";
import { About } from "./components/About/About";
import { Register } from "./components/Register/Register";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myGarden" element={<MyGarden />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
