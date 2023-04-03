import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import List from "./components/List";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>

  );
}

export default App;
