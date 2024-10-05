import { HomePage } from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MyGarden } from "./components/MyGarden/MyGarden";
import { About } from "./components/About/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myGarden" element={<MyGarden />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
