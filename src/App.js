import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NewPersonForm from "./components/NewPersonForm";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<NewPersonForm />} />
      </Routes>
    </Router>
  );
}

export default App;
